/**
 * Tencent is pleased to support the open source community by making WePY available.
 * Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.
 *
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */


import path from 'path';
import chokidar from 'chokidar';
import compareVersions from 'compare-versions';
import ignore from 'ignore';

import cache from './cache';
import util from './util';
import cScript from './compile-script';

import loader from './loader';
import resolve from './resolve';

let watchReady = false;
let preventDup = {};


export default {
    /**
     * find parent, import xxxx from xxx;
     */
    findParents (file) {
        let src = cache.getSrc();
        let files = util.getFiles(src);
        let ext = cache.getExt();

        let parents = [];

        let reg = new RegExp('\\.(' + ext.substr(1) + '|js)$');

        files = files.filter((v) => reg.test(v));

        files.forEach((f) => {
            let opath = path.parse(path.join(util.currentDir, src, f));
            let content = util.readFile(opath);
            content && content.replace(/import\s*([{\w\d-_}]*)\s*from\s*['"](.*)['"]/ig, (match, name, importpath) => {
                let resolved = resolve.resolveAlias(importpath, opath);
                if (path.extname(resolved) === '')
                    resolved += ext;
                let compath;
                if (path.isAbsolute(resolved)) {
                    compath = path.resolve(resolved);
                } else {
                    compath = path.join(opath.dir, resolved);
                }
                if (compath === path.join(util.currentDir, src, file)) {
                    if (!reg.test(f)) {
                        parents = parents.concat(this.findReference(f));
                    } else {
                        // 组件的父组件无需更新，只有父页面需要更新
                        if (f.indexOf('components') !== -1) { // 如果是父组件，继续查找父组件的父页面。
                            parents = parents.concat(this.findParents(f));
                        } else
                            parents.push(f);
                    }
                }
            });
        });
        return util.unique(parents).filter((v) => v.indexOf('components') === -1);
    },
    _cacheReferences: null,
    /**
     * find src, <script src="">
     */
    findReference (file) {
        let src = cache.getSrc();
        let files = util.getFiles(src);
        let ext = cache.getExt();

        let filepath = path.join(util.currentDir, src, file);

        if (this._cacheReferences === null) {
            this._cacheReferences = {};
            let reg = new RegExp('\\' + ext + '$');

            files = files.filter((v) => reg.test(v));

        }
        return this._cacheReferences[filepath] || [];
    },
    watch (cmd) {
        cmd.watch = false;

        let wepyrc = util.getConfig();
        let src = cmd.source || wepyrc.src || 'src';
        let dist = cmd.target || wepyrc.target || 'dist';
        chokidar.watch(`.${path.sep}${src}`, wepyrc.watchOption || {}).on('all', (evt, filepath) => {
            if ((evt === 'change' || evt === 'add') && watchReady && !preventDup[filepath]) {
                preventDup[filepath] = evt;
                cmd.file = path.relative(src, filepath);
                util.log('文件: ' + filepath, '变更');
                this.build(cmd);
                setTimeout(() => {
                    preventDup[filepath] = false;
                }, 500);
            }
        }).on('ready', () => {
            watchReady = true;
            util.log('开始监听文件改动。', '信息');
        });
    },
    checkCompiler (compilers) {
        if (compilers === undefined) {
            util.log('检测到老版本config文件，请先更新配置文件版本，参考链接：https://github.com/wepyjs/wepy#wepyconfigjs-配置文件说明', '错误');
            return false;
        }
        let k, exsit = true;
        for (k in compilers) {
            if (!loader.loadCompiler(k)) {
                return false;
            }
        }
        return true;
    },
    checkPlugin (plugins = {}) {
        return loader.loadPlugin(plugins);
    },

    wepyUpdate(required = '1.7.0') {
        let o = resolve.getPkg('wepy') || {};
        let pkg = o.pkg || {version: '0.0.0'};
        return compareVersions(required, pkg.version) === 1;
    },

    init (config) {
        let wepyrc = util.getConfig();
        console.log('\n=======拿到项目中的配置信息=======\n',wepyrc,'\n=======拿到项目中的配置信息=======\n');
        if (!wepyrc) {
            util.error('没有检测到wepy.config.js文件, 请执行`wepy new demo`创建');
            return false;
        }
        resolve.init(wepyrc.resolve || {});
        loader.attach(resolve);

        return true;
    },

    build (cmd) {
        let wepyrc = util.getConfig();

        let src = cmd.source || wepyrc.src;
        let dist = cmd.target || wepyrc.target;
        let ext = cmd.wpyExt || wepyrc.wpyExt;

        if (src === undefined)
            src = 'src';
        if (dist === undefined)
            dist = 'dist';
        if (ext === undefined)
            ext = '.wpy';

        cmd.source = src;
        cmd.dist = dist;
        cmd.wpyExt = ext;

        if (ext.indexOf('.') === -1)
            ext = '.' + ext;

        // WEB 模式下，不能指定文件编译
        let file = (cmd.output !== 'web') ? cmd.file : '';

        let current = process.cwd();
        let files = file ? [file] : util.getFiles(src);

        cache.setParams(cmd);
        cache.setSrc(src);
        cache.setDist(dist);
        cache.setExt(ext);


        // If dist/npm/wepy is not exsit, then clear the build cache.
        if (!util.isDir(path.join(util.currentDir, dist, 'npm', 'wepy'))) {
            cmd.cache = false;
        }
        if (!cmd.cache) {
            cache.clearBuildCache();
        }

        if (file) { // 指定文件编译时
            if (file.indexOf(ext) === -1) { // 是wpy文件，则直接编译，否则检查引用源
                let refs = this.findReference(file);
                if (refs.length === 0) { // 无引用源时，编译当前文件，否则编译引用源。
                    files = [file];
                } else {
                    files = refs;
                }
            } else if (file.indexOf('components') !== -1) { // 是wpy 文件，而且是组件
                let parents = this.findParents(file);
                files = parents.concat([file]);
            }
        }


        if (files.some((v) => v === 'app' + ext)) { // 如果编译文件包含app.wpy，且第一个不是 app.wpy
            if (util.isFile(path.join(current, src, 'app' + ext))) { // src/app.wpy 存在, 则把它放在第一位, 因为后面需要取页面路径
                let newFiles = ['app' + ext].concat(files.filter(v => v !== 'app' + ext));
                files = newFiles;
            } else {
                util.error('根目录不存在app' + ext);
            }
        }

        let igfiles = util.getIgnore();

        if (igfiles) {
            let ig = ignore().add(igfiles);
            files = ig.filter(files);
        }
        if (wepyrc.cliLogs) {
            util.cliLogs = true;
            util.clearLog();
        } else {
            util.removeLog();
        }

        files.forEach((f) => {
            let opath = path.parse(path.join(current, src, f));

            if (file) {
                this.compile(opath);
            } else { // 不指定文件编译时，跳过引用文件编译
                let refs = this.findReference(f);
                if (!refs.length)
                    this.compile(opath);
            }
        });
        
        // console.log('保存');

        if (cmd.watch) {
            util.isWatch = true;
            this.watch(cmd);
        }
    },
    compile(opath) {
        let src = cache.getSrc();
        let dist = cache.getDist();
        let ext = cache.getExt();
        let config = util.getConfig();

        if (!util.isFile(opath)) {
            util.error('文件不存在：' + util.getRelative(opath));
            return;
        }

        // 过滤声明文件
        if(opath.name.includes('.d')) return;

        switch(opath.ext) {
            case '.js':
                cScript.compile('babel', null, 'js', opath);
                break;
            case '.ts':
                cScript.compile('typescript', null, 'ts', opath);
                break;
            default:
                util.output('复制', path.join(opath.dir, opath.base));

                let plg = new loader.PluginHelper(config.plugins, {
                    type: opath.ext.substr(1),
                    code: null,
                    file: path.join(opath.dir, opath.base),
                    output (p) {
                        util.output(p.action, p.file);
                    },
                    done (rst) {
                        if (rst.code) {
                            let target = util.getDistPath(path.parse(rst.file));
                            util.writeFile(target, rst.code);
                        } else {
                            util.copy(path.parse(rst.file));
                        }
                    },
                    error (rst) {
                        util.warning(rst.err);
                        util.copy(path.parse(rst.file));
                    }
                });
        }
    }
}
