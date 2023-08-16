# 项目部署

使用此项目时请留意把 vite.config.ts、env 等文件中的关于项目名称、接口地址等根据实际需要进行配置，具体见 vite 官方。

本项目预览部署在 Nginx 并且使用的是 history 路由模式、同时部署在非根目录下，所以在此分享下

## 项目配置

```shell
# 如果部署在非根目录下 例如：https://aaa.com/vue3-h5 下，需要配置对应的配置项base
VITE_PUBLIC_PATH = /vue3-h5/
```

## Nginx 配置

以https://aaa.com/vue3-h5为例

```shell
server {
      #省略其他
      location /vue3-h5 {
          #打包后的资源路径  一般都是诸如Jenkins或云效流水线之类的自动化打包
          alias /www/vue3-h5/dist;
          index index.html index.htm;
          #处理history模式的访问问题
          try_files $uri $uri/ /vue3-h5/index.html;
      }
      #省略其他
    }
```

具体如何部署根据公司安排即可，只需要改下配置配合一下。
