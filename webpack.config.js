const path = require('path');

module.exports = {
    entry: {
      'entry': './index.js'
    },
    output: {
        path: __dirname+ '/public/',
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: [
                    /\.js$/,
                ],
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [[
                        'env', {
                            targets: {
                            browsers: ['last 2 versions']
                            }
                        }
                    ]]
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                    }
                ],
            },
        ]
    }
  };