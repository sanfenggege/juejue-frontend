module.exports = {
  "plugins": [
    require("postcss-pxtorem")({
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    })
  ]
}

// https://github.com/cuth/postcss-pxtorem
// {
//   rootValue: 16,
//   unitPrecision: 5,
//   propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'word-spacing'],
//   selectorBlackList: [],
//   replace: true,
//   mediaQuery: false,
//   minPixelValue: 0,
//   exclude: /node_modules/i
// }