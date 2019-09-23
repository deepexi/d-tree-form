module.exports = api => {
  return {
    presets: [['@babel/env', {modules: api.env('test') ? 'commonjs' : false}]],
    plugins: [
      [
        '@babel/transform-runtime',
        {
          regenerator: true
        }
      ],
      [
        'component',
        {
          libraryName: 'element-ui',
          styleLibraryName: 'theme-chalk'
        }
      ]
    ]
  }
}
