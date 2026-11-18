# 王雁鹏 · AI 产品作品集

静态站点，纯 HTML/CSS + 少量原生 JS，**没有任何构建步骤和外部依赖**。
上传到任意静态托管就能打开。

## 文件

```
index.html            首页（首屏 + 两个案例 + 能力 + 联系）
project-ensp.html     案例 01：eNSP 排障助手
project-jd.html       案例 02：投递决策器
style.css             全站样式（设计令牌都在顶部 :root）
assets/               图片：场景照片、界面截图、玻璃折射贴图、分享图
```

## 本地打开

- 直接双击 `index.html` 即可，但**玻璃折射在 file:// 下会降级成磨砂**；
- 想看到完整效果，在文件夹里跑一个静态服务器：

```bash
# 任选一个
npx serve .
python -m http.server 8080
```

## 放到网上（三种，按省事程度排序）

### 1) Netlify Drop（最快，拖拽即上线，不需要命令行）
1. 打开 https://app.netlify.com/drop
2. 把**整个文件夹**（不是 zip）拖进去
3. 几秒后得到一个 `xxx.netlify.app` 的网址，可以直接发人
4. 想换域名/更新：再拖一次同一个文件夹即可

### 2) Vercel（需要登录，支持自定义域名）
1. https://vercel.com/new → 选 **Deploy without Git** / 上传文件夹
2. Framework 选 `Other`，Build Command 留空，Output Directory 填 `.`
3. Deploy

### 3) GitHub Pages（免费、长期、可绑域名）
```bash
git init && git add . && git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```
仓库 → Settings → Pages → Source 选 `main` / `/root` → 几分钟后
`https://<用户名>.github.io/<仓库名>/` 生效。

## 上线后建议改一处

`index.html`、`project-*.html` 里的分享图用的是相对路径：

```html
<meta property="og:image" content="assets/og.jpg">
```

部分平台（微信、X）要求**绝对地址**，上线后把它换成：

```html
<meta property="og:image" content="https://你的域名/assets/og.jpg">
```

## 换素材

| 想换什么 | 覆盖哪个文件 |
|---|---|
| 首屏 / 背景的冰川照片 | `assets/scene-glacier.webp` |
| eNSP 详情的黑沙滩头图 | `assets/scene-coast.webp` |
| 投递决策器详情的草帽山头图 | `assets/scene-mountain.webp` |
| 产品截图 | `assets/shot-ensp-*.webp`、`assets/shot-jd-*.webp` |
| 分享卡片图 | `assets/og.jpg`（1200×630） |

替换时保持文件名不变，代码不用动。

## 注意

- 场景照片来自 StyleKit 液态玻璃展示页的示例素材，**正式对外建议换成自己有授权的图**。
- 产品截图是本地 demo 的数据，发布前确认里面没有真实设备、账号或个人信息。
