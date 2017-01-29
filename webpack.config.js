var path = require("path");

module.exports = {
    entry: {
        app: ["./client/src/index.js"]
    },

    output: {
        path: path.resolve(__dirname, "client/public"),
        publicPath: '/',
        filename: "bundle.js"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    
    devtool: 'source-map',
    cache: false,
    debug: true,

    devServer: {
        contentBase: './client/public/',
        proxy: {
            '/graphql': {
                target: 'http://localhost:3000/graphql',
                secure: false
            }
        }
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                // loader: 'babel-loader',
                loaders: ['babel-loader?presets[]=es2015,presets[]=stage-2'],
                exclude: /node_modules/
            }
        ]
    }
};