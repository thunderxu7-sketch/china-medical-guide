# China Medical Guide

面向海外访客的英文赴华就医信息站。访客可以查看服务、估算费用与在华停留时间，再把意向项目发给接待团队。网站结构参考 [CNDocTeam](https://cndocteam.com/)。

[访问 GitHub Pages 网站](https://thunderxu7-sketch.github.io/china-medical-guide/)。公开站提供完整的服务目录、行程和咨询准备指南。GitHub Pages 托管静态文件，公开版通过项目选择器引导访客查看服务详情，不收集个人联系方式。带邮件表单的版本可用下方的 Pages Functions 配置运行。

推送到 `main` 后，GitHub Actions 会测试、构建并发布 `dist/`。工作流从 GitHub Pages 配置读取域名和项目路径。可选的仓库变量 `PUBLIC_WHATSAPP_NUMBER` 用于启用运营方自己的联系入口。

网站包含 26 个内容页面和一个同域咨询接口，覆盖 14 项服务。Astro 生成静态 HTML，Cloudflare Pages Functions 通过 Resend 将咨询发到接待邮箱，运行时无需数据库。首页采用为本项目制作的医院场景配图，详见[图片说明](docs/site-imagery.md)。

浏览器中的首页截图分为[桌面版（1440 × 900）](docs/preview/home-desktop.jpg)和[手机版（390 × 844）](docs/preview/home-mobile.jpg)。

## 本地启动

使用 Node.js 24。安装了 nvm 的环境可先运行 `nvm use`。

```sh
npm ci
npm run dev
```

运行自动化测试、类型检查和生产构建。

```sh
npm test
npm run check
npm run build
```

`npm run preview` 可预览静态页面。要在本机同时运行咨询接口，在构建后从仓库根目录执行以下命令。

```sh
npx wrangler@4.168.0 pages dev dist --compatibility-date=2026-01-01
```

正式接收邮件需设置 `INQUIRY_FROM`、`INQUIRY_TO` 和 `MAIL_API_KEY`。本地联调通过 `.dev.vars` 读取，线上使用 Pages 运行时配置。要启用 WhatsApp，请在构建时提供自己的 `PUBLIC_WHATSAPP_NUMBER`。有正式域名后，在构建环境中设置 `SITE_URL` 以生成规范链接。详见[邮件配置](docs/consultation-mail.md)和[变量示例](.env.example)。

## 可独立认领的模块

各工作单列出文件归属、输入、产出和验收方式，可独立建分支维护。[GitHub Issues](https://github.com/thunderxu7-sketch/china-medical-guide/issues?q=is%3Aissue%20label%3Amodule) 记录模块进度，[公共约定](docs/contracts.md) 定义页面路径、数据和接口响应。

| Issue | 工作单 | 交付范围 | 独立验收方式 |
| --- | --- | --- | --- |
| [#1](https://github.com/thunderxu7-sketch/china-medical-guide/issues/1) | [公共布局与首页](docs/modules/01-site-shell.md) | 公共导航、页脚、手机布局、首页 | 直接预览首页，核对桌面和手机布局及链接目标 |
| [#2](https://github.com/thunderxu7-sketch/china-medical-guide/issues/2) | [服务目录与项目详情](docs/modules/02-services.md) | 服务目录与 14 个静态详情页 | 构建 15 页，核对项目标识、价格单位与咨询链接 |
| [#3](https://github.com/thunderxu7-sketch/china-medical-guide/issues/3) | [医生目录与患者故事](docs/modules/03-specialists-and-stories.md) | 医生目录、2 个医生详情页、患者故事 | 使用演示内容检查 4 条路由和资料缺省状态 |
| [#4](https://github.com/thunderxu7-sketch/china-medical-guide/issues/4) | [行程、FAQ 与政策页面](docs/modules/04-patient-information.md) | 出行、关于、FAQ、隐私政策、服务条款 | 独立预览 5 页，使用测试报价检查 FAQ |
| [#5](https://github.com/thunderxu7-sketch/china-medical-guide/issues/5) | [咨询表单](docs/modules/05-consultation-form.md) | 项目预选、表单、提交状态、WhatsApp 入口 | 模拟接口响应，验证成功、失败和重复点击 |
| [#6](https://github.com/thunderxu7-sketch/china-medical-guide/issues/6) | [咨询邮件接口](docs/modules/06-consultation-api.md) | 同域 POST 接口、字段校验、调用邮件服务 | 用模拟邮件服务发起 HTTP 请求，验证状态码和邮件内容 |

## 合并后验收

- 构建产物包含 26 个业务页面和一个 404 错误页，列表、导航和详情链接均可直接访问及刷新。
- 同一项目在目录、详情和 FAQ 展示相同的报价与计价单位，咨询选择器覆盖目录中的全部 14 项。
- 从白内障详情页打开咨询表单会预选该项目。自动化测试使用模拟邮件服务覆盖接收、拒绝、超时与重试。接入运营邮箱后，在预览环境用测试资料核对真实收件和回复地址。
- 在手机和桌面上完成相同流程，检查导航、键盘操作和 WhatsApp 按钮是否挡住表单或页脚链接。

尚无运营方报价时，服务页注明公开参考价格的来源、单位和核对日期。医生目录提供两个专科指南，已获发布许可的资料可加入相应页面。患者故事只展示获准发布的内容。正式对外接待前，由运营方确认收件邮箱、政策中的主体和隐私联系方式，以及邮件保留期限。
