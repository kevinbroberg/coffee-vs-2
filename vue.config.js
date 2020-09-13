module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|)$/i,
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      ],
    },
  };