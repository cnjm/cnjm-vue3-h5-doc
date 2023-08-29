# vite 配置

## 别名配置

在项目开发中，引入跨多个层级的文件时诸如：`../../../a/b/c.vue` 的操作既影响可读性也不利于维护。因此配置了相关别名，你也可以自行添加

```ts
{
  // 别名
  alias: [
    // /@/xxxx => src/xxxx
    {
      find: /\/@\//,
      replacement: pathResolve("src") + "/",
    },
    // /#/xxxx => types/xxxx
    {
      find: /\/#\//,
      replacement: pathResolve("types") + "/",
    },
  ],
},
```

## server 配置

本地服务相关配置，例如 port 以及跨域代理都可以直接在`env/.env.development`中直接配置，详细代码见`/build/utils`

```ts
server: {
  // 监听到本地IP
  host: true,
  port: VITE_PORT,
  // 本地开发的代理配置
  proxy: createProxy(VITE_PROXY),
},
```

## plugins vite 插件

所有的 `vite` 相关插件在`/build/vite/plugin/index`中导入使用,并导出 `createVitePlugins` 函数在 `vite.config.ts` 中使用，详细配置见[vite 插件章节](./vite-plugin)

```ts
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    componentResolverPlugin(),
    autoImportPlugin(),
  ];
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  vitePlugins.push(configUnocssPlugin());
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  vitePlugins.push(autoVconsolePlugin(isBuild));
  VITE_USE_MOCK &&
    vitePlugins.push(configViteMockServePlugin(isBuild, VITE_USE_MOCK));
  //... other
  return vitePlugins;
}
```

## build 配置

1. `rollup`相关配置将 js 拆分到模块文件夹。

2. `vue、vue-router、axios` 单独打包并且不带 `hash` 值，如不需要可 `vite.config.ts` 中自行去除 `manualChunks`。

3. 开启了大于 `20k` 使用 `gzip` 压缩，如需配置刻在 `build\vite\plugin\compression.ts` 中配置，如需关闭 `env\.env.production` 中 `VITE_USE_GZIP` 改为 `false`。

其余并无特殊操作，见`vite.config.ts`
