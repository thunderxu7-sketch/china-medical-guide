# China Medical Guide

面向海外访客的英文赴华就医信息站。访客可以查看服务、估算费用与在华停留时间，再把意向项目发给接待团队。网站结构参考 [CNDocTeam](https://cndocteam.com/)。

仓库目前提供可运行的 Astro 首页、14 个服务标识和咨询接口类型。首版交付范围为 26 个页面和 1 个同域邮件接口。静态页面从仓库内容生成，团队通过邮箱接收咨询。项目、医生和费用数据使用经运营方确认的资料。

## 本地启动

使用 Node.js 24。安装了 nvm 的环境可先运行 `nvm use`。

```sh
npm ci
npm run dev
```

`npm run check` 检查类型，`npm run build` 生成静态站点到 `dist/`，`npm run preview` 预览构建结果。开发首页可以直接运行。需要接入联系方式时，参见 [.env.example](.env.example)。

## 可独立认领的模块

每个模块都可以从 `main` 单独建分支。各工作单列出文件归属、输入、产出和验收方式。[GitHub Issues](https://github.com/thunderxu7-sketch/china-medical-guide/issues?q=is%3Aissue%20label%3Amodule) 用于认领和跟踪进度，[公共约定](docs/contracts.md) 定义跨模块共用的页面路径、字段和响应。

| Issue | 工作单 | 交付范围 | 独立验收方式 |
| --- | --- | --- | --- |
| [#1](https://github.com/thunderxu7-sketch/china-medical-guide/issues/1) | [公共布局与首页](docs/modules/01-site-shell.md) | 公共导航、页脚、手机布局、首页 | 直接预览首页，核对桌面和手机布局及链接目标 |
| [#2](https://github.com/thunderxu7-sketch/china-medical-guide/issues/2) | [服务目录与项目详情](docs/modules/02-services.md) | 服务目录与 14 个静态详情页 | 构建 15 页，核对项目标识、价格单位与咨询链接 |
| [#3](https://github.com/thunderxu7-sketch/china-medical-guide/issues/3) | [医生目录与患者故事](docs/modules/03-specialists-and-stories.md) | 医生目录、2 个医生详情页、患者故事 | 使用演示内容检查 4 条路由和资料缺省状态 |
| [#4](https://github.com/thunderxu7-sketch/china-medical-guide/issues/4) | [行程、FAQ 与政策页面](docs/modules/04-patient-information.md) | 出行、关于、FAQ、隐私政策、服务条款 | 独立预览 5 页，使用测试报价检查 FAQ |
| [#5](https://github.com/thunderxu7-sketch/china-medical-guide/issues/5) | [咨询表单](docs/modules/05-consultation-form.md) | 项目预选、表单、提交状态、WhatsApp 入口 | 模拟接口响应，验证成功、失败和重复点击 |
| [#6](https://github.com/thunderxu7-sketch/china-medical-guide/issues/6) | [咨询邮件接口](docs/modules/06-consultation-api.md) | 同域 POST 接口、字段校验、调用邮件服务 | 用模拟邮件服务发起 HTTP 请求，验证状态码和邮件内容 |

## 合并后验收

- 构建产物包含 26 个计划内页面，列表、导航和详情链接均可直接访问及刷新。
- 同一项目在目录、详情和 FAQ 展示相同的报价与计价单位，咨询选择器覆盖目录中的全部 14 项。
- 从白内障详情页打开咨询表单会预选该项目。使用测试资料向项目方指定的测试邮箱提交一条咨询，核对项目名称、回复地址和留言。
- 在手机和桌面上完成相同流程，检查导航、键盘操作和 WhatsApp 按钮是否挡住表单或页脚链接。

网站文案、医生资料、图片和收件信息由实际运营方提供。演示资料只用于本地开发与验收。
