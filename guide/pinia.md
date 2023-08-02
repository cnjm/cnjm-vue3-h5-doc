# pinia

[Pinia](https://pinia.web3doc.top/) 是 `Vue` 的存储库。

你可以在 `src\store\modules\demo.ts` 以及 `src\views\demo\example\pinia\index.vue` 的 `demo` 中（或者项目中的其他地方）了解一些 `pinia` 常有的方式方法。

更多相关功能参见 `pinia` 官方文档。

## store

一个基础的 `store` 是这样的，如果你熟悉 `vuex` ，那便轻易能理解。

```ts
export const useDemoStore = defineStore({
  // 唯一标识，每个store都需要有
  id: "demo",
  // 状态
  state: () => ({
    count: 0,
  }),
  // 计算值
  getters: {},
  // 相当于methods，常用于业务逻辑
  actions: {},
});
```

## state

定义初始化状态，类型会自动推导

```ts
export const useDemoStore = defineStore({
  // ...
  state: () => ({
    count: 0,
  });
})
```

组件内使用：

```ts
import { useDemoStore } from "/@/store/modules/demo";
// 使用前先实例化store
const demoStore = useDemoStore();

// 可以直接进行读写
demoStore.count = 1;

// 或者通过$patch
demoStore.$patch((state) => {
  state.count++;
  state.testArray.push(2);
});
// 甚至整个替换
demoStore.$state = {
  count: 0,
  testObj: {
    title: "demo",
  },
  testArray: [1],
};
```

## getters

```ts
export const useDemoStore = defineStore({
  // ...
  getters: {
    // 可以这样写
    getDoubleCount: (state) => {
      return state.count * 2;
    },
    // 也可以这样写
    // getDoubleCount(state) {
    //   return state.count * 2;
    // },
    // 如果使用this 需要明确返回值类型
    // getDoubleCount(): number {
    //   return this.count * 2;
    // },
    // 当依赖当前store的其他的getters  此时用到this
    getDoubleCountPlusOne(): number {
      return this.getDoubleCount + 1;
    },
    // 使用其他store的getters时 *****应避免循环引用******
    otherGetter(state) {
      const pageStore = usePageStoreWithOut();
      return { test: pageStore.demoStoreTest, count: state.count };
    },
  },
});
```

组件内使用：

**基本等同于 `state`**

::: tip 提示
`getters` 通过返回一个函数可以接受任意参数，但将失去缓存作用。
:::

## actions

```ts
export const useDemoStore = defineStore({
  // ...
  actions: {
    // 更新count
    updateCount(count: number): void {
      this.count = count;
    },
    // 异步更新count
    async asyncChangeCount(count: number): Promise<void> {
      try {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.count = count;
            resolve();
          }, 2000);
        });
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
```

组件内使用：

```ts
function changeCount() {
  demoStore.updateCount(91);
}
async function asyncChangeCount() {
  await demoStore.asyncChangeCount(88);
}
```

## 组件外使用

通过导出一个 `useDemoStoreWithOut` 在其他 `ts` 文件中引入使用

```ts
export function useDemoStoreWithOut() {
  return useDemoStore(store);
}
```

::: tip 提示
应避免循环依赖。
:::

## subscribe(state 订阅)

```ts
// 订阅state mutation可以获取一些更改的相关信息
demoStore.$subscribe((mutation, _state) => {
  // mutation.type 'direct' | 'patch object' | 'patch function'
  console.log(mutation);
});
```

## onAction(action 订阅)

```ts
// 订阅一个action
const unsubscribe = demoStore.$onAction(
  ({
    name, // action 的名字
    store, // store 实例
    args, // 调用这个 action 的参数
    after, // 在这个 action 执行完毕之后，执行这个函数
    onError, // 在这个 action 抛出异常的时候，执行这个函数
  }) => {
    // 此处将在actions开始前执行
    subscribeData.record.push(
      `before----${Date.now()}:${name}[${args.join(", ")}]`
    );

    console.log(store);

    // 如果 action 成功并且完全运行后，after 将触发。
    // 它将等待任何返回的 promise
    after((result) => {
      subscribeData.record.push(`after----${Date.now()}:${name}[${result}]`);
    });

    // 如果 action 抛出或返回 Promise.reject ，onError 将触发
    onError((error) => {
      subscribeData.record.push(`Failed----${Date.now()}:${name}[${error}]`);
    });
  }
);
```

## pinia-plugin-persistedstate(state 持久化插件)

得益于 `pinia` 的插件化设计，`src\store\index.ts` 使用了 `pinia-plugin-persistedstate` 插件作为 `state` 持久化存储的方案。

有个[pinia-plugin-persist](https://github.com/Seb-L/pinia-plugin-persist)也提供相似的功能，这两简直像的离谱，使用上的区别大致就是 pinia-plugin-persist 可以配置 strategies，是个数组，针对不同的 paths 使用不同的 storage，但貌似没有像 pinia-plugin-persistedstate 一样提供一些诸如 beforeRestore 的钩子。

`paths` 中定义需要持久存储的字段

详细用法见[pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

```ts
export const useDemoStore = defineStore({
  // ...
  // 持久化存储插件配置persist 默认使用的是 localStorage
  persist: {
    key: "demo",
    // storage可自定义见 https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/config.html#storage
    // storage: localStorage,
    paths: [""],
  },
});
```

## 自定义插件（$resetFields）

当然，我们也能根据业务需要实现一些自定义插件，例如 `pinia` 本身只支持重置整个 `state`，不支持可选的单个值[issues](https://github.com/vuejs/pinia/issues/2287#issuecomment-1612955589)。

既然如此我们便可自定义这样一个插件：

`src\plugins\pinia\piniaReset.ts`

```ts
import { PiniaPluginContext } from "pinia";
import { pick } from "lodash-es";

declare module "pinia" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  export interface _StoreWithState<Id extends string, S extends StateTree, G, A>
    extends StoreProperties<Id> {
    //  选择自定义一个方法名，当然，你也可以覆盖$reset方法，这里只是不想破坏原有的东西，仅为示例
    $resetFields<K extends keyof S>(fields?: K[]): void;
  }
}

export default ({ options, store }: PiniaPluginContext): void => {
  store.$resetFields = (fields) => {
    const { state } = options;
    let originalState = state ? state() : {};
    store.$patch(($state) => {
      if (fields) {
        originalState = pick(originalState, fields);
      }
      Object.assign($state, originalState);
    });
  };
};
```
