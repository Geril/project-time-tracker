var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var globalCSS = new ExtractTextPlugin('assets/styles/global.css');

var production = process.env.NODE_ENV === 'production' || false;
var development = process.env.NODE_ENV === 'development' || false;
var testing = process.env.NODE_ENV === 'testing' || false;

var envConfigFile = testing ? 'development' : process.env.NODE_ENV || 'default';
var envConfigPath = __dirname + '/src/config/environments/' + envConfigFile + '.js';
var httpServicePath = __dirname + '/src/redux/services/http.js';

console.log('============================================\n App is built in %s environment\n============================================\n', process.env.NODE_ENV);

var app = [
    './src/index.jsx',
    './src/index.html',
    './src/styles/global.scss',
];
var common = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk',
    'isomorphic-fetch',
    'react-css-modules',
    'redux-form',
    'moment',
    'react-router',
];

var plugins = [
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
    }),
];

if (development) {
    plugins.push(
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        globalCSS
    );
}

if (production) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        globalCSS
    );
}

if (testing) {
    var httpServicePath = __dirname + '/test/services/http.js';
    var entry = {
        app: app,
    }
} else {
    var entry = {
        app: app,
        common: common
    };
}

module.exports = {
    entry: entry,
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.html$/,
                loader: testing ? 'null' : 'file?name=[name].[ext]',
            },
            {
                test: /\.(scss)$/,
                exclude: /global.scss/,
                loaders: testing ? ['null'] : [
                    'style',
                    'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:10]',
                    'resolve-url',
                    'sass',
                ],
            },
            {
                test: /global.scss/,
                loader: testing ? 'null' : globalCSS.extract(['css', 'sass']),
            },
            {
                test: /\.(gif|png|svg)$/,
                loader: testing ? 'null' : 'url-loader?mimetype=image/png&limit=10000&name=/assets/images/[name]-[hash].[ext]',
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    sassLoader: {
        includePaths: [path.join(__dirname, 'src', 'styles')],
    },
    resolve: {
        root: path.resolve('./src/'),
        alias: {
            envConfig: envConfigPath,
            httpService: httpServicePath,
            reduxFolder: path.join(__dirname, 'src', 'redux'),
            components: path.join(__dirname, 'src', 'components'),
            actions: path.join(__dirname, 'src', 'actions'),
            helpers: path.join(__dirname, 'src', 'helpers'),
            reducers: path.join(__dirname, 'src', 'reducers'),
            test: path.join(__dirname, 'test'),
        },
        extensions: ['', '.js', '.jsx', '.scss']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '',
        filename: 'bundle.js'
    },

};
