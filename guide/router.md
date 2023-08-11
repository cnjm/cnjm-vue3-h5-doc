# vue-router

vue-router 在稍复杂些的 vue 项目中都有着重要作用，必然是需要着重处理的。

项目中主要有做如下处理：

1. 以 src\views\demo 目录下的文件为例，批量生成路由文件

2. 覆写了 router.push 和 router.replace 以支持携带固定参数、处理 params

3. 路由守卫中有简单的权限判断、动态添加路由

## router 目录结构

```txt
┌───guard
├───├───index.ts
├───├───permissionGuard.ts 全局路由守卫
├───routes
├───├───modules 自行配置的路由配置项，只做 tabbar 的三个示例
├───├───├───about.ts
├───├───├───comp.ts
├───├───├───home.ts
├───├───entrance.ts 应用入口（登录、活动等）无需验证权限的页面
├───├───error.ts 错误页（404 等）
├───├───index.ts 路由配置最终生成，包括 demo 文件夹下自动生成配置的示例
├───constant.ts 一些常量导出
├───index.ts 创建路由
└───type.ts 类型
```

https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22
未完待续
