const path = require('path')

module.exports = {
  entry: path.join(__dirname,'./scripts/app.js'),
  output: {
    path: path.join(__dirname,'./dist'),
    filename: '[name].js'
  },
  devServer:{
    contentBase: path.join(__dirname)
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
        }, {
        loader: "css-loader" // translates CSS into CommonJS
        }, {
        loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.join(__dirname,'scripts')
       },
      {
        test: /\.(woff|svg|ttf|eot)$/i,
        loader:'url-loader',
        options:{
          /*图片名称*/
          name:"fonts/[name].[ext]"
          /*位置*/
        }
      }
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      //   exclude: /(node_modules)/,
      //   include: path.join(__dirname,'json')
      // }
    ]
  }
}