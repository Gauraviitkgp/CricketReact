const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = {
	output: {
		publicPath: "http://localhost:3001/",
	},
	devServer: {
		port: 3001,
		historyApiFallback: true,
	},
	entry: "./src/index.tsx",
	mode: "development",
	devtool: "inline-source-map",
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
		extensions: [".tsx", ".ts", ".js", ".css", ".json"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "datashower",
			filename: "remoteEntry.js",
			remotes: {
                datashower:"datashower"
            },
			exposes: {
				"./Shower": "./src/App.tsx",
			},
			shared: {
				// ...deps,
				react: {
					singleton: true,
					eager:true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					eager:true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./public/index.html",
		}),
	],
};
