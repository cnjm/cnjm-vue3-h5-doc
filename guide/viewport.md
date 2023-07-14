# css 适配方案

## Viewport 布局适配

项目采用`viewport`布局适配,`postcss-px-to-viewport` 是一款 `PostCSS` 插件，用于将 `px` 单位转化为 `vw/vh` 单位

因项目使用`vant ui`，而 `vant` 默认使用 `px` 作为样式单位，并且设计稿为 `375px`，与我们项目中一般使用 750px 作为设计尺寸不同，而 `vite` 并不像 `webpack` 提供相应路径，为兼容此情况采用[cnjm-postcss-px-to-viewport](https://github.com/cnjm/postcss-px-to-viewport) 解决方案，详见相关文章[解决 vite 中使用 postcss-px-to-viewport 无法使用 vant 等多种设计尺寸问题](https://blog.csdn.net/weixin_42998707/article/details/124150578)

当然，上述问题你都不需要关心，在项目中使用 px 作为单位书写你的`css`即可，默认设计稿尺寸为`750px`，如有不同，在`postcss.config.js`中根据提示进行修改。

## 附上相关配置

```js
const path = require("path");
module.exports = () => {
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8",
        ],
      },
      "cnjm-postcss-px-to-viewport": {
        unitToConvert: "px", // 要转化的单位
        viewportWidth: 750, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [], // 设置忽略文件，用正则做目录名匹配
        landscape: false, // 是否处理横屏情况
        // 如果没有使用其他的尺寸来设计，下面这个方法可以不需要，比如vant是375的
        customFun: ({ file }) => {
          // 这个自定义的方法是针对处理vant组件下的设计稿为375问题
          const designWidth = path
            .join(file)
            .includes(path.join("node_modules", "vant"))
            ? 375
            : 750;
          return designWidth;
        },
      },
    },
  };
};
```
