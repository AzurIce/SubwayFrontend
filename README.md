# frontend

```mermaid
gantt
title 前端
dateformat YYYY-MM-DD
section 前端
    创建项目                                          :done, create_project, 2023-07-03, 1d
    
    基本项目结构                                      :done, frontend_basic, after create_project, 1d
    登陆、注册界面                                    :done, login_page, after create_project, 1d
    
    纽约地铁线路数据获取解析                             :done, route_data, after create_project, 1d
    接入 MapBox API 完成基本地铁线路可视化（固定）         :done, map_basic, after frontend_basic, 1d
    
    接入 MTA GTFS 完成基本的地铁位置可视化（离散的）       :done, pos_basic, after map_basic, 2d
    与后端登录注册对接                                 :done, login_page_connect, 2023-07-07,  1d
    
    接入 goodservice API 实现地铁线路可视化（实时）      :done, route_realtime, 2023-07-07, 2d
    实现地铁位置可视化（实时）                          :done, pos_realtime, 2023-07-08, 3d
    完成站点选择与对应数据可视化                        :done, vis_station, after pos_realtime, 1d
    完成管理员界面用户修改、删除                       :done, admin, after pos_realtime, 1d
    与后端对接完成人流量热力图可视化                     :done, heat_map, after pos_realtime, 2d
```







This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
