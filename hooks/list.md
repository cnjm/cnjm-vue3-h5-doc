# loadList

项目自带有实现比较简单的 `useLoadList` 方便代码复用维护

一般 `h5` 都有类似的列表页面，只需要配合 `vant` 的 `van-pull-refresh`、`van-list` 等组件即可快速实现诸如加载更多，下拉刷新等

```ts
const { loading, refreshing, error, finished, loadState, loadData, onRefresh } =
  useLoadList<string>({
    request: loadList,
    formState: formState,
  });
```

```html
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <van-list
    v-model:loading="loading"
    v-model:error="error"
    :finished="finished"
    :finished-text="loadState.status === 'noMore' ? '没有更多了' : '暂无数据'"
    error-text="请求失败，点击重新加载"
    @load="loadData"
  >
    <van-cell v-for="item in loadState.list" :key="item" :title="item" />
  </van-list>
</van-pull-refresh>
```

也有 `useMultipleLoadList` 可以适配多个 `tab` 切换的列表页面

如果你的接口并非 `pageNum`、`pageSize` 作为分页查询，而是譬如 `lastId` 等，这需要你根据实际情况做出修改，此处仅为示例

具体实现详见以下文件以及相应的 `demo`:

`src\hooks\core\useLoadList.ts`=>`src\views\demo\listHooks\index.vue`

`src\hooks\core\useMultipleLoadList.ts`=>`src\views\demo\listHooksMultiple\index.vue`
