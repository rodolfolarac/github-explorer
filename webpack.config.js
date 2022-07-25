const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//o Método acima é utilizado para retornar se é um ambiente
//desenvolvimento ou não
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  //Escolhe a propriedade de carregamento(development
  //para desenvolvimento e torna um pouco mais rapido
  // a renderização)
  mode: isDevelopment ? "development" : "production",
  //Configuração do Source Map
  //eval-source-map serve para ambientes de desenvolvimento
  devtool: isDevelopment ? "eval-source-map" : "source-map",

  //Escolhe o arquivo principal de entrada
  entry: path.resolve(__dirname, "src", "index.tsx"),
  //Escolhe o arquivo de saida, que irá gerar com o webpack
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  //serve para identificar as extensões lidas pelo webpack
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  //Irá monitorar as atualizações no src e atualizar o bundle
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
  },

  //Deve-se Adicionar uma variavel plugins para utilzar o htmlWebpack
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),

    new HtmlWebpackPlugin({
      //aqui dentro passamos o path com a url do index.html
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        //Verifica se o arquivo é .jsx
        exclude: /node_modules/,
        // exclue a verificação da pasta node_modules
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
        // Babel-loader é a integração entre o babel e o webpack
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
