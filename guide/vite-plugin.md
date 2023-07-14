# vite 插件

## unplugin-vue-components

使用[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 已经配置自动导入 `vant`,`src\components\resolver` 下的组件也会默认自动按需导入，目前只找到这种固定的文件结构的方式，具体要看这个[pr](https://github.com/antfu/unplugin-vue-components/pull/645)能不能过更多自定义导入在 `build\vite\plugin\componentResolver.ts` 可配置

## unplugin-auto-import

使用[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 已经配置自动导入 `vue`、`vue-router`、`pinia` 以及`/@/hooks/web/useMessage`,更多自定义导入在`build\vite\plugin\autoImport.ts`可配置

## unplugin-auto-vconsole

用于动态导入` vconsole`，方便在生产环境查看调试的一款插件，线上链接只需要加上` enable_console=1` 参数即可([unplugin-auto-vconsole](https://github.com/cnjm/unplugin-auto-vconsole))，例如：`http://baidu.com?enable_console=1`，不必担心后续的页面跳转 `vue-router` 会把参数丢失而需要每次都传递 `enable_console`，[router 章节中](./router) 将说明重写的 `router` 以支持跳转支持固定参数，以及对 `params` 的处理，相信你会觉得好用。

当前默认配置如下：

`build\vite\plugin\autoVconsole.ts`

```ts
import autoVconsole from "unplugin-auto-vconsole/vite";
export const autoVconsolePlugin = (isBuild) => {
  // 当build时才需要，本地可以在控制台直接查看
  function vconsoleEnabled() {
    if (isBuild) {
      return true;
    } else {
      return false;
    }
  }
  return autoVconsole({
    isBuild,
    enabled: vconsoleEnabled(),
  });
};
```

## unocss

[unocss](https://uno.antfu.me/), antfu 大佬的 css 原子化方案。

本人觉得不必一味追求 css 原子化，但确确实实可以带来不少便利，项目大的话，较少 css 体积还是很有帮助。并且当只需要几句简单的 css 样式时，不用再想一个 class 名称，简直太好了。

## vite-plugin-mock

用于 mock 数据请求，详情在[mock 章节](./mock)

未完待续。。。
