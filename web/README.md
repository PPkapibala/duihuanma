# 迅风兑换码管理前端

Vue 2 + View UI (iView) 实现，与 PRD《迅风兑换码权限分离 & BPM 流程统一》对应。

## 技术栈

- **Vue** 2.7
- **Vue Router** 3.x
- **View UI (iView)** 4.x
- **axios**（请求封装可按需添加）

## 项目结构

```
web/
├── public/
├── src/
│   ├── views/
│   │   ├── Layout.vue          # 整体布局（侧栏 + 顶栏 + 内容区）
│   │   ├── codes/Index.vue     # 单人兑换码（活动列表 + 审批记录）
│   │   ├── reusable/Index.vue  # 复用兑换码
│   │   ├── query/Index.vue     # 单码查询（单人/复用）
│   │   └── items/Index.vue     # 道具管理
│   ├── router/index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── vue.config.js
```

## 开发

```bash
cd web
npm install
npm run serve
```

默认访问：http://localhost:8080 ，默认进入「单人兑换码」页。

## 接口说明

当前列表与查询为前端 Mock 数据，后续需对接后端 API（可在 `src/api/` 下封装 axios，并在各页面 `loadList` 等中调用）。

## 环境变量

可选在项目根目录增加 `.env.development`：

- `VUE_APP_API_BASE`：后端 API 基地址，供 `vue.config.js` 中 proxy 使用。
