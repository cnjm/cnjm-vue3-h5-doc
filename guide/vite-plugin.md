# vite 插件

## unplugin-vue-components

使用[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 已经配置自动导入 `vant`,`src\components\resolver` 下的组件也会默认自动按需导入，目前只找到这种固定的文件结构的方式，具体要看这个[pr](https://github.com/antfu/unplugin-vue-components/pull/645)能不能过更多自定义导入在 `build\vite\plugin\componentResolver.ts` 可配置

## unplugin-auto-import

使用[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) 已经配置自动导入 `vue`、`vue-router`、`pinia` 以及`/@/hooks/web/useMessage`,更多自定义导入在`build\vite\plugin\autoImport.ts`可配置
