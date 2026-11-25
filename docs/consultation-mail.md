# 咨询邮件配置

Cloudflare Pages Functions 从项目根目录的 `functions/api/consultations.ts` 加载同域接口。页面构建命令为 `npm run build`，静态输出目录为 `dist`。部署流程需同时包含 Functions 和静态产物。[Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)

## 收发件配置

在 Pages 项目的 Preview 或 Production 环境设置相应的运行时变量，然后重新部署相应环境。

| 名称 | 值 |
| --- | --- |
| `INQUIRY_FROM` | Resend 已验证域名下的发件地址，可使用显示名称 |
| `INQUIRY_TO` | 运营方接待邮箱。预览环境可指定项目方的测试邮箱 |
| `MAIL_API_KEY` | Resend 邮件发送 API 密钥，作为运行时 secret 保存 |

接口发送纯文本，收件地址来自运行环境，回复地址来自访客表单。姓名、邮箱、电话、国家、服务名称和留言随邮件交给 Resend 及接待邮箱。接口不保存咨询数据，不记录表单正文或上游响应正文。[Resend 发信接口](https://resend.com/docs/api-reference/emails/send-email)

## 请求与重试

字段和 HTTP 状态以[首版公共约定](contracts.md)为准。请求体上限为 32 KiB，姓名最多 120 字符、邮箱 254、电话 64、国家 120、留言 4000。浏览器发送的请求须与接口同源。可选的 `Idempotency-Key` 头接受 UUID，同一份表单因发送失败重试时可复用其值，重新填写的咨询应分配新值。Resend 会在 24 小时内对复用同一键的相同请求去重。[Resend 重试文档](https://resend.com/docs/dashboard/emails/idempotency-keys)

邮件服务接受请求后返回 200，邮件服务拒绝、连接失败或等待超过 8 秒返回 502。实际投递状态可在项目方的收件箱或 Resend 控制台核对。

## 本地验收

在 Node.js 24 环境下，从仓库根目录运行以下命令。测试以标准 Request 调用处理器，通过模拟传输覆盖正常接收、字段校验、收发件人、配置缺失、上游拒绝和超时。

```sh
node --test tests/consultations-api/mail.test.mjs
npm run check
npm run build
```

要在本机同时预览静态页面与 Pages Functions，可在构建后运行 `npx wrangler pages dev dist`。本机用于联调的运行时配置写入被 Git 忽略的 `.dev.vars`。使用项目方指定测试邮箱做真实投递时，先选定对应的预览环境。
