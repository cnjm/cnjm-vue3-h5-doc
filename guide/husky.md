# 代码规范

中大型项目中一般都涉及团队协作开发，统一团队的代码风格是非常重要的。当然，如果你认为你当前项目目前乃至以后都不太需要，也可以选择关闭以下相关设置。

项目中自带了`prettierrc`+`eslint`进行代码书写约束，并配合`husky`在`pre-commit`钩子中进行校验。

同时配合`commitlint`在 `commit` 时对提交信息进行约束，该配置在`commitlint.config.js`中可以查看相应的规则，可以根据你的需求自行更改。

- 这里遵循 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
