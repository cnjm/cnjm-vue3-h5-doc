# mock

## 请求 mock 的使用

axios 所有的请求默认路径带了`/api` 前缀，如有必要在配置文件中修改，`mock` 中也带有`/api` 前缀，需同步修改，在需要 `mock` 的接口的路径中加入`/mock`，即为请求 `mock` 数据

1. 例如期望请求`/api/user/login`

2. 在 `src/api` 文件夹中只需要填写`/user/login` 会正常请求

3. 而填写`/mock/user/login`，则会请求`/api/mock/user/login` 获取 mock 数据
