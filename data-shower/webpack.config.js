const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
    mode:"development",
    devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
              },
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js",".css",".json"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
    plugins: [
        // new ModuleFederationPlugin({
        //   name: "monolith",
        //   filename: "remoteEntry.js",
        //   remotes: {},
        //   exposes: {},
        //   shared: {
        //     ...deps,
        //     react: {
        //       singleton: true,
        //       requiredVersion: deps.react,
        //     },
        //     "react-dom": {
        //       singleton: true,
        //       requiredVersion: deps["react-dom"],
        //     },
        //   },
        // }),
        new HtmlWebPackPlugin({
          template: "./public/index.html",
        }),
      ],
};