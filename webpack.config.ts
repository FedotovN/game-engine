const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

function getWebpackPlugins() {
    if (isProduction) return [];
    return [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ]
}

const config = {
    entry: {
        index: {
            import: './src/index.ts',
            filename: 'index.js'
        },
        services: {
            import: './src/services/index.ts',
            filename: 'services/index.js'
        },
        models: {
            import: './src/models/index.ts',
            filename: 'models/index.js'
        },
        components: {
            import: './src/models/components/index.ts',
            filename: 'components/index.js'
        },
        shared: {
            import: './src/models/shared/index.ts',
            filename: 'shared/index.js'
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: getWebpackPlugins(),
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    mode: 'production',

};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';


    } else {
        config.mode = 'development';
    }
    return config;
};
