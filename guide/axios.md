### axios 请求

项目对 axios 进行了一些基本的配置和封装，有些只需要在 env 文件中修改，而有的修改可能需要根据你的业务需求来修改代码。

## 如何使用

1. `src\api\system\user.ts` 新增一个 post 请求的导出

```ts
export const loginApi = (
  params: LoginParams,
  mode: ErrorMessageMode = "modal"
) =>
  defHttp.post<LoginResult>(
    { url: Api.Login, params },
    { errorMessageMode: mode }
  );
```

2. 使用时只需要导入并调用即可

```ts
import { loginApi } from "/@/api/system/user";
// 相关参数详见类型标注
const data = await loginApi(loginParams, mode);
```

其中，`defHttp` 为 `src\utils\axios\index.ts` 中通过 `createAxios` 得到 `axios` 实例，可以通过不同配置创建其他实例，一个项目中有不同的 `axios` 策略时可以复用相关代码。

`defHttp.post<LoginResult>(config,options) ` 详见类型标注。

## 基本配置

1. 创建实例时默认配置参数，创建其他实例时只需要 `opt` 中给出更改的配置即可。

`src\utils\axios\index.ts`>`createAxios`

```ts
deepMerge(
  {
    // 授权标头
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    // authentication schemes，e.g: Bearer
    authenticationScheme: "",
    // 超时
    timeout: 10 * 1000,
    // 基础接口地址
    // baseURL: globSetting.apiUrl,
    headers: { "Content-Type": ContentTypeEnum.JSON },
    // 如果是form-data格式
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    // 数据处理方式
    transform,
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: {
      // 默认将prefix 添加到url
      joinPrefix: true,
      // 是否返回原生响应头 比如：需要获取响应头时使用该属性
      isReturnNativeResponse: false,
      // 需要对返回数据进行处理
      isTransformResponse: true,
      // post请求的时候添加参数到url
      joinParamsToUrl: false,
      // 格式化提交参数时间
      formatDate: true,
      // 错误消息提示类型
      errorMessageMode: "message",
      // 接口地址
      apiUrl,
      // 接口默认前缀拼接地址
      urlPrefix,
      //  是否加入时间戳
      joinTime: true,
      // 忽略取消重复请求标识
      ignoreCancelToken: true,
      // 是否携带token
      withToken: true,
    },
  },
  opt || {}
);
```

## 如何修改

请求地址以及接口路径的前缀在 `env` 文件中即可修改，其他配置见下文。

### 目录结构说明

`src\utils\axios`

`axios` ：导出一个 `VAxios` 类，实例方法可在此查看

`axiosCancel` ：导出一个 `AxiosCanceler` 类，取消重复请求的相关方法

`axiosTransform` ：导出一个 `AxiosTransform` 、 `CreateAxiosOptions` 类型的类型文件

`checkStatus` ：导出一个 `checkStatus` 函数，用于处理网络请求不同的 `status` 响应处理

`helper` ：辅助函数相关代码

`index` ：导出一个 `VAxios` 实例，以及 `axios` 的相关 `transform` 也在此定义

### 处理请求响应的数据

`transform` 中较为主要的在于 `transformRequestHook` 方法，也是最可能修改的地方。

诸如以下三类：

1. 是否返回原生响应头、响应字段名称（`code`, `result`,` message`）等等

2. 以及与后端约定的不同的 `code` 应该如何处理

3. 最后则是错误提示的形式，目前都是直接用的 `vant` 的 `toast`、`dialog` 或者 `none`

### 请求拦截器处理（token）

**诸如需要修改在请求前加入 `token` 到 `headers` 时，可在 `requestInterceptors` 处理**

```ts
const userStore = useUserStoreWithOut();
const token = userStore.getToken;
// 请求之前处理config
if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
  // jwt token
  (config as Recordable).headers.Authorization = options.authenticationScheme
    ? `${options.authenticationScheme} ${token}`
    : token;
}
return config;
```

::: tip 提示
更多说明参见`src\utils\axios\index.ts`。
:::
