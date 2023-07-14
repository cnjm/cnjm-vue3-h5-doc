import { DefaultTheme, defineConfig } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  { text: "指南", link: "/guide/" },
  {
    text: "组件",
    link: "/component/virtual-list",
  },
];

const sidebar: DefaultTheme.Sidebar = {
  "/guide": [
    {
      text: "指南",
      items: [
        { text: "介绍", link: "/guide/" },
        { text: "快速开始", link: "/guide/quickstart" },
        { text: "代码规范", link: "/guide/husky" },
        { text: "vite配置", link: "/guide/vite-config" },
      ],
    },
    {
      text: "预设&配置",
      items: [
        { text: "env环境变量", link: "/guide/env" },
        { text: "vite插件", link: "/guide/vite-plugin" },
        { text: "css适配方案", link: "/guide/viewport" },
        { text: "自定义指令", link: "/guide/directive" },
        { text: "vantUi", link: "/guide/vant" },
        { text: "pinia", link: "/guide/pinia" },
        { text: "vue-router", link: "/guide/router" },
        { text: "axios", link: "/guide/axios" },
        { text: "mock", link: "/guide/mock" },
      ],
    },
    {
      text: "其他",
      items: [
        { text: "依赖项", link: "/guide/dependencies" },
        { text: "项目部署", link: "/guide/arrange" },
      ],
    },
  ],
  "/component": [
    {
      text: "组件",
      items: [{ text: "虚拟列表", link: "/component/virtual-list" }],
    },
  ],
};

export default defineConfig({
  title: "cnjm-vue3-h5",
  description: "cnjm-vue3-h5 使用说明文档",
  lang: "cn-ZH",
  base: "/vue3-h5-doc/",
  lastUpdated: true,
  themeConfig: {
    logo: "/public/logo.png",
    siteTitle: "cnjm-vue3-h5",
    outline: "deep",
    outlineTitle: "章节导航",
    socialLinks: [
      { icon: "github", link: "https://github.com/cnjm/cnjm-vue3-h5" },
    ],
    nav,
    sidebar,
  },
  markdown: {
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    lineNumbers: true,
    config(md) {},
  },
});
