# 06 咨询邮件接口与投递处理

## 目标

提供同域 `POST /api/consultations`。校验咨询数据后发给配置的接待邮箱，向前端返回约定的 JSON 和 HTTP 状态。

## 文件归属

- `functions/api/consultations.ts` 作为 Cloudflare Pages Functions 入口
- `src/server/consultations/`、`tests/consultations-api/` 及该模块的邮件配置说明
- 读取 `src/contracts/consultations.ts` 和 `src/data/services.ts`。

## 交付内容

将邮件投递封装为可注入的函数，测试时传入模拟实现。接收端校验必填字段、邮箱和服务 slug，使用固定的服务端收件人和发件人，将访客邮箱设为回复地址。邮件含人类可读的项目名称和留言。通过环境配置邮件服务凭据，错误日志只保留请求状态。

## 独立验收

- [ ] 使用标准 HTTP 请求和模拟邮件服务验收，无需前端表单或真实邮箱凭据。
- [ ] 有效请求只交给邮件服务一次，服务商接受后返回 200。无效 JSON、未知项目或缺字段返回 400。
- [ ] 非 POST 返回 405，服务商拒绝或超时返回 502，配置缺失返回 503。响应体符合公共类型。
- [ ] 验证收件人来自服务端配置、回复地址来自表单，邮件正文使用对应项目名称。提供可复跑的本地验证命令，运行 `npm run check` 与 `npm run build`。

接口、数据和路由见[首版公共约定](../contracts.md)。运行时参数及测试命令见[咨询邮件配置](../consultation-mail.md)。
