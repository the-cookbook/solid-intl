module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        "babel-preset-solid",
        '@babel/preset-typescript'
      ],
      plugins: ['babel-plugin-jsx-dom-expressions']
    }
  }
};
