# vue-router

`vue-router` 在稍复杂些的 `vue` 项目中都有着重要作用，必然是需要着重处理的。一切以业务需求为准，本项目只是做一个基础的示例。

项目中主要有做如下处理：

1. 以 `src\views\demo` 目录下的文件为例，批量生成路由文件

2. 覆写了 `router.push` 和 `router.replace` 以支持携带固定参数、处理 `params`

3. 路由守卫中有简单的权限判断、动态添加路由

## router 过渡动画

`src\design\transition` 中配置了一些常见的组件过渡动画，`src\layouts\default\index.vue` 中默认使用 `fade`，也可以在 `route.meta.transitionName` 中单独配置

## router 目录结构

先了解下主要代码的目录结构，**具体逻辑结合项目代码查看**

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

## 路由配置

**关于 meta**

官方配置方式方法等就不多赘述，其中 `meta` 元信息如下定义，有这几个，大致能知道有了哪些实现

```ts
interface RouteMeta extends Record<string | number | symbol, unknown> {
  // 标题
  title: string;
  // 是否忽略权限
  ignoreAuth?: boolean;
  // 角色信息
  roles?: RoleEnum[];
  // 是否不缓存
  ignoreKeepAlive?: boolean;
  // 当前页面转换
  transitionName?: string;
  // 忽略params 标记后将不会传递params
  ignoreParams?: boolean;
}
```

**关于配置文件**

### 手动配置路由并手动导入使用

在本项目中我们可以手动配置路由配置，并在 `src\router\routes\index.ts` 中导入并通过 `basicRoutes` 导出使用，当然，你可随意更改。

### 手动配置路由文件自动导入使用

为了避免配置文件堆放在在一个文件，并且减少人工导入导出的麻烦，我们也可以手动配置文件后自动导入使用，在 `src\router\routes\modules` 下新建的任意 `ts` 文件都将自动导入使用。在此以三个 `tabBar` 页面组件作为示例。同样可以根据需要做出修改。

```ts
const modules: Record<string, any> = import.meta.glob("./modules/**/*.ts", {
  eager: true,
});
Object.values(modules).forEach(async (value) => {
  const mod = value.default;
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});
```

### 批量生成路由配置文件

类似于`require.context`,`vite` 中我们使用 `import.meta.glob` 也可以读取响应的文件，同时得益于 `vue3.3` 的 `defineOptions`，我们可以轻易实现动态生成约定式路由配置信息。

项目中以 `src\views\demo` 文件夹为例，约定 `demo` 下的任意文件夹下的 `index.vue` 文件为路由页面，`defineOptions` 中配置 `name` 作为 `router name`，无则以对应的文件夹路径作为 `name`。

**详细实现步骤见：**

1. src\router\routes\index.ts => 通过 import.meta.glob 获取 demo 下的文件。

2. src\plugins\router\index.ts => 生成路由配置的具体实现。

**以配置一个/demo/custom 路由为例：**

1. 新建如下文件 src\views\demo\custom\index.vue

2. src\views\demo\custom\index.vue 文件中 defineOptions 配置如下

```vue
<script setup lang="ts">
defineOptions({
  name: "DemoCustomPage",
  inheritAttrs: false,
  meta: { title: "自定义指令" },
});
</script>
```

3.  此时访问 baseURL + /demo/custom 即可

::: tip 提示
import.meta.glob 不能传变量，所以如果需要换成其他路径（非示例 demo 以外）的话需要讲上述代码实现中的 demo 替换成你需要的文件夹
:::

## 路由守卫

`src\router\guard\permissionGuard.ts` 在路由守卫中，我们做了一些可能与你的业务逻辑不符的处理，这可能需要你根据实际情况进行更改。

例如：

1. 限制了非登录用户(无 `token`)用户进入需要校验登录态的页面(根据 `meta` 中的 `ignoreAuth`)

2. 根据权限添加动态路由

3. `afterEach` 时标记是否清除 `updateRouterParams`

以下是一些详细说明

### 路由权限

根据如下逻辑处理相关权限判断，请根据实际业务需要使用。

`src\hooks\web\useAuth.ts`

```ts
export function getAuthStatus(roles: RoleEnum[]) {
  const userStore = useUserStoreWithOut();
  if (appSetting.whetherToVerifyPermissions) {
    return true;
  }
  const roleList = toRaw(userStore.getRoleList) || [];
  // 没有设置角色则默认通过
  if (!roles || roles.length <= 0) return true;
  // 设置特定的角色（超级管理员）默认都可以访问
  if (roleList.includes(RoleEnum.SUPER)) return true;
  // 余下需要判断该用户是否包含所需角色
  return roleList.some((role) => roles.includes(role));
}
```

### 动态路由

`permissionStore.buildRoutesAction`(`src\store\modules\permission.ts:28`) 中根据上述的路由权限对 `src\router\routes\index.ts` 中导出的 `asyncRoutes` 进行路由筛选

筛选后的路由将在路由守卫中添加

```ts
// 动态添加相关路由
const routes = await permissionStore.buildRoutesAction();
routes.forEach((route) => {
  router.addRoute(route as unknown as RouteRecordRaw);
});
permissionStore.setDynamicAddedRoute(true);
```

## Plugin (可能有用的功能)

**注意：如果你不需要或者不喜欢以下处理，全局搜索如下关键字可以清除相关代码：**

`overWriteRouter` `persistQuery` `routerParams` `markRouterPath`

### 跳转带固定参数

在实际业务需求中我们可能常常需要在 `url` 中一直带着某些参数。

只需要在 `src\store\modules\page.ts` 的 `state.persistQuery` 中配置

```json
{
  // 接收一个参数字段名称组成的数组
  "persistQuery": ["test"]
}
```

`https://a.com/b/c?test=123456` 当导航跳转到 `d` 页面时，`test` 会自动带上，不需要 `push/replace` 时手动添加

跳转后页面路径为 `https://a.com/b/d?test=123456`

具体实现可以查看 `src\plugins\router\index.ts` `overWriteRouter`

### params 处理（刷新保持）

基于各种原因很多时候我们希望路由跳转时携带参数但又不希望在 url 中展示，这时我认为使用 params 是个不错的选择。

但关于 `router`.`params` 的一些问题可以查看这个[CHANGELOG](https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22)

此项目的处理是，如果路由跳转携带了 `params`(`name`模式 而非 `path`)时，会将其存储在 `PageStore` 的 `routerParams` 中，但在跳转后使用参数时不需要去 `state` 中获取这么麻烦(当然这么获取也是可以的)，但你可以直接通过 `useRoute().params` 获取到传递过来的参数，并且刷新页面等操作仍然是有效地。

具体实现可以查看 `src\plugins\router\index.ts`的`overWriteRouter`以及`src\router\guard\permissionGuard.ts`的`afterEach`

相关示例可以在 `src\views\demo\example\router\index.vue` 中看到

1. 跳转开始页：

```vue
<script setup lang="ts">
const router = useRouter();

function nameParamsMode() {
  router.push({ name: "DemoDeepRouterPage", params: { mode: "params" } });
}
</script>

<template>
  <div>
    <van-button @click="nameParamsMode">name-push-params</van-button>
  </div>
</template>
```

2. 跳转目标页

```vue
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <div>
    <!-- 将获取到传递进来的：{ mode: "params" } -->
    <div>params:{{ route.params }}</div>
  </div>
</template>
```

::: tip 提示
`params`相关逻辑是利用 `pinia` 和 `sessionStorage` 实现的持久化，如果你需要携带的数据不适合放在 `pinia` 或者 `sessionStorage`，这将不适用或者说可能需要根据实际情况做出修改。
:::
