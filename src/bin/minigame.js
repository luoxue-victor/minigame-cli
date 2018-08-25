import chalk from 'chalk';
import program from 'commander';

console.log('欢迎使用minigame-cli')

program
    .version(require('../../package.json').version, '-v, --version')
    .usage('<command> [options]');

program
    .command('init <template-name> [project-name]')
    .description('generate a new project from a template')
    .action(require('./minigame-init'))
    .usage('<template-name> [project-name]')
    .option('-c --clone', 'use git clone')
    .option('--offline', 'use cached template')
    .on('--help', () => {
      console.log();
      console.log('  Example:');
      console.log();
      console.log(chalk.gray('   # create a new project with an official template'));
      console.log('  $ wepy init standard my-project');
      console.log();
      console.log(chalk.gray('   # create a new project straight from a github template'));
      console.log('  $ wepy init username/repo my-project');
      console.log();
    });

program
    .command('build')
    .description('build your project')
    .action(require('./minigame-build'))

    .option('-f, --file <file>', '待编译wpy文件')
    .option('-s, --source <source>', '源码目录')
    .option('-t, --target <target>', '生成代码目录')
    .option('-o, --output <type>', '编译类型：web，weapp。默认为weapp')
    .option('-p, --platform <type>', '编译平台：browser, wechat，qq。默认为browser')
    .option('-w, --watch', '监听文件改动')
    .option('--no-cache', '对于引用到的文件，即使无改动也会再次编译');

program.parse(process.argv);
