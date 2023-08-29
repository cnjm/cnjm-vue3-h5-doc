# vite 插件

详细使用方法见各插件官方文档

## unplugin-vue-components

`unplugin-vue-components` 是一款可以自动导入组件使用同时支持 `TS` 的 `unplugin` 插件。

使用[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 已经配置自动导入 `vant`,`src\components\resolver` 下的组件也会默认自动按需导入，目前只找到这种固定的文件结构的方式，具体要看这个[pr](https://github.com/antfu/unplugin-vue-components/pull/645)能不能过。更多自定义导入在 `build\vite\plugin\componentResolver.ts` 可配置

## unplugin-auto-import

`unplugin-auto-import` 是一款可以自动导入 API 使用同时支持 `TS` 的 `unplugin` 插件。

使用[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 已经配置自动导入 `vue`、`vue-router`、`pinia` 以及`/@/hooks/web/useMessage`。更多自定义导入在`build\vite\plugin\autoImport.ts`可配置

## unplugin-icons

`unplugin-icons` 是一款按需使用图标的 `unplugin` 插件。

使用[unplugin-icons](https://github.com/antfu/unplugin-icons) 按需使用自定义图标（`svg`），同时你可以随意使用[iconify](https://icon-sets.iconify.design/) 中所有的图标集。

考虑到@iconify/json 约 120MB 的体积，项目采用的是单独安装图标集的方式使用，并且开启 `autoInstall`，直接使用 ，插件会自动安装对应的图标集依赖。并且结合 unplugin-vue-components 后，也无需手动引入组件。

**详细用例见：`src\views\demo\svgIcons\index.vue `**

### 使用 iconify 图标集示例

项目以使用 [svg-spinners](https://icon-sets.iconify.design/svg-spinners) 为示例演示使用 `iconify` 图标集

使用时只需要写相应的组件名称即可正常使用，没有安装的图标集会自动安装，也不需要手动导入。

**组件名规则：`<icon-图表集名称-图标名称/>`**

```vue
<template>
  <icon-svg-spinners-blocks-shuffle-2 />
</template>
```

### 使用自定义 svg 图标示例

项目以使用 `src\assets\icons\about` 文件夹下的 `svg` 文件为示例演示使用自定义图标的方式。

使用时只需要将 `svg` 文件放到`src\assets\icons\about`中，在使用的地方写相应的组件名称即可正常使用，同样的，也不需要手动导入。

组件名规则：`<icon-文件夹名称-svg名称/>`

```vue
<template>
  <icon-about-logout />
</template>
```

### 自行设置自定义图标

如果需要在其他文件夹下自定义使用图标，以期望使用`src\assets\icons\demo`下的 `svg` 图标为例，只需如下步骤：

1. `unplugin-icons`(`build\vite\plugin\unpluginIcons.ts`) 下的 `customCollections` 新增一个配置项

```ts {8-11}
export const unpluginIcons = () => {
  return Icons({
    // ... other
    customCollections: {
      about: FileSystemIconLoader("src/assets/icons/about", (svg) =>
        svg.replace(/^<svg /, '<svg fill="currentColor" ')
      ),
      // 此处的key,也就是demo，将作为组件的图标集名称部分
      demo: FileSystemIconLoader("src/assets/icons/demo", (svg) =>
        svg.replace(/^<svg /, '<svg fill="currentColor" ')
      ),
    },
  });
};
```

2. `unplugin-vue-components`(`build\vite\plugin\componentResolver.ts`) 下的 `IconsResolver.customCollections` 数组中新增一个项

```ts {11}
// ...
IconsResolver({
  prefix: "Icon",
  // 如果图表集名字太长可以设置别名，如下所示可以使用spinners 代替 svg-spinners,设置别名后二者是等价的
  //  <icon-svg-spinners-blocks-shuffle-2 />
  //  <icon-spinners-blocks-shuffle-2 />
  alias: {
    spinners: "svg-spinners",
  },
  // 在此新增步骤1中的customCollections的key
  customCollections: ["about","demo"],
}),
// ...
```

3. 直接在项目中使用，图标集名称为 `customCollections` 的 `key`

```vue
<template>
  <icon-demo-svg文件名 />
</template>
```

附：[官方示例代码](https://github.com/antfu/unplugin-icons/blob/main/examples/vite-vue3/vite.config.ts)

::: tip 提示
需要注意的是，如果你的 `svg` 图标内有硬编码比如 `path` 设置有 `fill="#21a675"`，**这将使你设置的 `color` 不会被覆盖**，你可以手动清除，或者在 `FileSystemIconLoader` 是通过正则转化处理。
:::

## unplugin-auto-vconsole

`unplugin-auto-vconsole` 是一款可以自动按需导入 `vconsole` 使用的 `unplugin` 插件。

用于动态导入` vconsole`，方便在生产环境查看调试的一款插件，线上链接只需要加上` enable_console=1` 参数即可([unplugin-auto-vconsole](https://github.com/cnjm/unplugin-auto-vconsole))，例如：`http://baidu.com?enable_console=1`，不必担心后续的页面跳转 `vue-router` 会把参数丢失而需要每次都传递 `enable_console`，[router 章节中](./router) 将说明重写的 `router` 以支持跳转支持固定参数，以及对 `params` 的处理，相信这对你是有帮助的。

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

[unocss](https://uno.antfu.me/), 参考 `antfu` 大佬的[重新构想原子化 CSS](https://zhuanlan.zhihu.com/p/425814828)。

[参考文档](https://unocss.dev/interactive/)

个人觉得不必一味追求 css 原子化，但确确实实可以带来不少便利，项目大的话，对减少 css 体积还是很有帮助。并且当只需要几句简单的 css 样式时，不用再想一个 class 名称，简直太好了。

## vite-plugin-mock

`vite-plugin-mock` 是一款模拟请求数据的 `vite` 插件，用于 mock 数据请求，详情在[mock 章节](./mock)

## vite-plugin-compression

[`vite-plugin-compression`](https://github.com/vbenjs/vite-plugin-compression) 是一款压缩文件的 `vite` 插件，可在配置文件中配置是否开启，是否压缩后删除源文件等

未完待续。。。
