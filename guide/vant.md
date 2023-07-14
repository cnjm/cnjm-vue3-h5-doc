# vant UI

项目使用`vant v4.6.1+` 版本,并已经处理 `vant` 使用 `375px` 设计尺寸问题，可放心食用。

## 如何使用

得益于 `unplugin-vue-components` 自动引入，你无需引入注册等操作即可使用，如使用 `button` 组件：

```html
<van-button>按钮</van-button>
```

你可以在[`vant` 官网](https://vant-contrib.gitee.io/vant/#/zh-CN/quickstart#fang-fa-er.-an-xu-yin-ru-zu-jian-yang-shi)看到更加详尽的用法

## 函数组件

使用函数组件（`Toast`，`Dialog`，`Notify` 和 `ImagePreview`）时，推荐在`/@/hooks/web/useMessage` 中统一处理再导出，并且由 `unplugin-auto-import` 处理函数的自动导入，可以在项目中很丝滑得使用相应的组件。

```vue
<script setup lang="ts">
// 无需手动引入createToast
createToast({ message: "弹出toast" });
</script>
```

当然，如果你不希望使用约定的导出名称来避免手动引入，也可以去除，在需要的时候再手动引入，这也能让引用更加清晰可见。
