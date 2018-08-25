const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: true,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['minigame', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: isProd,
      strictMath: true
    },
    typescript: {
      "compilerOptions": {
          "module": "SystemModule"
      }
    },
    babel: {
      sourceMap: !isProd,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions'
      ]
    }
  },
  plugins: !isProd ? {} : {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}
