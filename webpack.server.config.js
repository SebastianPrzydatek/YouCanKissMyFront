module.exports = {
    entry: ['./server/index.ts'],
    output: {
      path: `${__dirname}/dist/server`,
      filename: './[name].js',
    },
    node: {
        __dirname: false,
        __filename: false,
      },
};