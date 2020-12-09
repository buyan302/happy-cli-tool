const targetModule = process.env['MODULE'] || false

module.exports = {
  presets: [['@babel/env', { modules: targetModule }]],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        corejs: 3,
      },
    ],
    ['@babel/proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  env: {
    // for jest test
    test: {
      presets: [
        ['@babel/env', { modules: 'cjs' }]
      ]
    }
  }
}
