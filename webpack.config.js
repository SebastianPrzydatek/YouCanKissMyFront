module.exports = {
    entry: ['./index.ts'],
    output: {
      path: `${__dirname}/dist`,
      filename: './[name].js',
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
        }]
    }
};