import { DefaultTheme, defineConfig } from "vitepress";

const nav: DefaultTheme.NavItem[] = [
  { text: "指南", link: "/guide/" },
  {
    text: "文档",
    link: "/document/cnjm-vue-h5/",
  },
];

const sidebar: DefaultTheme.Sidebar = {
  "/document/cnjm-vue-h5": [
    {
      text: "cnjm-vue-h5",
      items: [
        { text: "介绍", link: "/document/cnjm-vue-h5/" },
        { text: "快速开始", link: "/document/cnjm-vue-h5/quickstart" },
      ],
    },
  ],
  "/document/practical": [
    {
      text: "practical",
      items: [
        { text: "practical介绍", link: "/document/practical/" },
        { text: "快速开始", link: "/document/cnjm-vue-h5/quickstart" },
      ],
    },
  ],
};

export default defineConfig({
  title: "cnjm-vue3-h5",
  description: "cnjm-vue3-h5 使用说明文档",
  lang: "cn-ZH",
  base: "/",
  lastUpdated: true,
  themeConfig: {
    logo: "/public/logo.png",
    siteTitle: "cnjm-vue3-h5",
    outline: 3,
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
