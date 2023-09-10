const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
  
  return {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    mode: "development",

    // ローカル開発用環境を立ち上げる
    // 実行時にブラウザが自動的に localhost を開く
    devServer: {
      static: "dist",
      open: true
    },
    entry: {
      main: path.resolve(__dirname, "src/assets/js"),
      other: path.resolve(__dirname, "src/assets/scss", "style.scss"),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },

    module: {
      rules: [
        {
          test: /\.ejs$/,
          use: [
            /**
             * HtmlLoader -> TemplateEjsLoader
             */ 
            "html-loader",
            "template-ejs-loader",
          ],
        },
        {
            test: /\.scss$/,
            use: [
                /**
                 * SassLoader -> CssLoader -> MiniCssExtractPluginLoader
                 */
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader",
              ],
        }
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.ejs"),
        filename: "index.html",
        minify: {
          collapseWhitespace: true,
          preserveLineBreaks: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.css',
      }),
    ],

  }
}
