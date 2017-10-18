const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin')

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
    rules: [
      {
      test: /\.(scss|css)$/,
      use: [ "style-loader","css-loader", "sass-loader" ]
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
          name:"fonts/[name].[ext]"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 25000
            }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'index.html')
    })
  ]
}