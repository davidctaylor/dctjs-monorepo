module.exports = {
  presets: [
    [
      '@babel/preset-env', { targets: { esmodules: false, node: "current" }}
    ],
    '@babel/preset-typescript',
    '@babel/plugin-transform-modules-commonjs'
  ],
};
