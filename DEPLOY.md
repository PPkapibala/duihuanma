# 迅风兑换码 - 部署指南

## GitHub Pages 在线访问（推荐，国内可访问）

项目已配置 `index.html`，访问根路径会自动跳转到原型页面。

### 启用步骤

1. 打开 https://github.com/PPkapibala/duihuanma/settings/pages
2. 在 **Source** 选择 **Deploy from a branch**
3. **Branch** 选 `main`，**Folder** 选 `/ (root)`
4. 点击 **Save**
5. 等待 1–2 分钟部署完成

### 访问地址

**https://ppkapibala.github.io/duihuanma/**

---

## 部署到 Git（推送到 GitHub）

### 前置条件
- 安装 [Git](https://git-scm.com/download/win)
- 注册 [GitHub](https://github.com) 账号

### 一键执行

**Windows：** 双击运行 `deploy-to-git.bat`

脚本将自动：初始化仓库 → 添加文件 → 提交 → 提示配置远程并推送。

### 手动执行

```bash
git init
git add .
git commit -m "deploy: 迅风兑换码原型与文档"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

> 请先在 GitHub 网页创建空仓库，再将上面的 `你的用户名/仓库名` 替换为实际值。

---

## 方式一：Vercel 一键部署（推荐）

### 前置条件
- 安装 [Node.js](https://nodejs.org/)（LTS 版本）
- 注册 [Vercel](https://vercel.com) 账号（可用 GitHub 登录）

### 执行部署

**Windows：** 双击运行 `deploy.bat`

**或命令行：**
```bash
npx vercel --prod
```

首次会提示：
1. 登录 Vercel（浏览器授权）
2. 确认项目名、目录等（直接回车使用默认即可）

部署成功后获得一个 `*.vercel.app` 的访问链接。

---

## 方式二：通过 Git + Vercel 自动部署

1. 安装 [Git](https://git-scm.com/download/win)
2. 在 [GitHub](https://github.com) 创建新仓库
3. 在项目目录执行：
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/你的用户名/仓库名.git
   git push -u origin main
   ```
4. 打开 [vercel.com](https://vercel.com) → Add New Project → 导入该 GitHub 仓库
5. 之后每次 `git push` 会自动部署

---

## 当前部署内容

- **静态原型**：`迅风兑换码-prototype.html`（单页 HTML，含全部交互）
- 根目录 `vercel.json` 已配置，访问根路径即可打开原型

---

## 部署 Vue 应用（web/）

若需部署 Vue 前端项目：

```bash
cd web
npm install
npm run build
npx vercel --prod
```

或在 Vercel 导入时设置 **Root Directory** 为 `web`，Vercel 会自动识别 Vue 并执行构建。
