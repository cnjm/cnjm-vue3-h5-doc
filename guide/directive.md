# 自定义指令

## v-auth

按钮级别的权限指令 `auth`，权限拦截`hooks/web/useAuth`中同路由权限校验

## v-debounce

防抖指令 `debounce`，默认 500 毫秒，使用同 `throttle`，详见 `src\plugins\directive\debounce.ts`

## v-scroll

元素滚动到底部指令 `scroll` ，详见 `src\plugins\directive\scroll.ts`

## v-throttle

元素点击节流指令 `throttle`，默认 `click` 事件，200 毫秒，可以这样使用 `v-throttle:click.500="fun"` 详见 `src\plugins\directive\throttle.ts`

## v-longTouch

双击指令 默认 600 毫秒，可以这样使用 `v-longTouch:stop.500="fun"` ，`stop` 可阻止 `touchstart` 默认事件 详见 `src\plugins\directive\throttle.ts`

## 使用示例

```vue
<template>
  <div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-auth="['custom']"
        >权限指令</van-button
      >
      <van-button
        plain
        type="primary"
        size="small"
        v-auth="['s_admin', 'test']"
        class="ml-50px"
        >按钮级别</van-button
      >
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-throttle="throttleClick"
        >节流指令</van-button
      >
      <div class="mt-12px text-28px">点击次数{{ throttleNum }}</div>
    </div>
    <div class="p-20px">
      <van-button plain type="primary" size="small" v-debounce="debounceClick"
        >防抖指令</van-button
      >
      <div class="mt-12px text-28px">点击次数{{ debounceNum }}</div>
    </div>
    <div class="p-20px">
      <van-button
        plain
        type="primary"
        size="small"
        v-longTouch:stop="longTouchClick"
        >长按指令</van-button
      >
    </div>
    <div class="p-20px h-200px overflow-scroll" v-scroll="onScroll">
      <div class="mt-12px text-28px" v-for="key in 30" :key="key">
        触底指令 | 滚动触发
      </div>
    </div>
  </div>
</template>
```
