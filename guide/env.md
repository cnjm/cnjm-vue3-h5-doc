# 环境变量

示例中使用了 history 开发，部署在 Nginx，并且部署为非根目录，如果有需要，可以查看[部署配置章节](./arrange)了解更多

## 通用配置

```shell
# 端口号
VITE_PORT = 9527

# 应用名称
VITE_GLOB_APP_TITLE = CNJM-H5
```

## dev

```shell
# 公共路径 vite base
VITE_PUBLIC_PATH = /vue3-h5/

# 路由模式 history | hash
VITE_ROUTER_MODE = history

# 是否开启mock
VITE_USE_MOCK = true

# 基本接口地址
VITE_GLOB_API_URL=

# 接口前缀
VITE_GLOB_API_URL_PREFIX=/api

# 文件上传地址
VITE_GLOB_UPLOAD_URL=https://upload-z2.qiniup.com

# 本地调试的代理配置
VITE_PROXY = [["/api","http://localhost:3000"],["/upload","https://upload-z2.qiniup.com"]]

# 删除日志
VITE_DROP_CONSOLE = false
```

##

```shell
# 公共路径 vite base
VITE_PUBLIC_PATH = /vue3-h5/

# 路由模式 history | hash
VITE_ROUTER_MODE = history

# 是否开启mock
VITE_USE_MOCK = true

# 是否开启压缩
VITE_USE_GZIP = true

# 基本接口地址
VITE_GLOB_API_URL=

# 接口前缀
VITE_GLOB_API_URL_PREFIX=/api

# 文件上传地址
VITE_GLOB_UPLOAD_URL=https://upload-z2.qiniup.com

# 本地调试的代理配置
VITE_PROXY = [["/api","http://localhost:3000"],["/upload","https://upload-z2.qiniup.com"]]

# 删除日志
VITE_DROP_CONSOLE = false
```
