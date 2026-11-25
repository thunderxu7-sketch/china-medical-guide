# 首版公共约定

## 页面和文件归属

| 负责模块 | 路由 | 页面数 |
| --- | --- | --- |
| 01 公共布局与首页 | `/` | 1 |
| 02 服务目录与项目详情 | `/services`、`/services/{service}` | 15 |
| 03 医生目录与患者故事 | `/doctors`、`/doctors/orthopedic`、`/doctors/ophthalmology`、`/testimonials` | 4 |
| 04 行程、FAQ 与政策页面 | `/travel`、`/faq`、`/about`、`/privacy`、`/terms` | 5 |
| 05 咨询表单 | `/consultation` | 1 |
| 06 咨询邮件接口 | `POST /api/consultations` | 1 个接口 |

合计 26 个页面。URL 末尾带查询参数仍是同一页面。布局统一导入 `src/layouts/BaseLayout.astro`，传入 `title` 与 `description`，通过默认 slot 输出正文。现有基础布局可支撑每个模块独立预览。

## 服务和报价

- [项目清单](../src/data/services.ts) 给出 14 个唯一的 `slug`、英文名称和分类。详情页、咨询下拉框、接口输入和邮件项目名称均使用这份清单。
- [服务详情](../src/data/service-details.ts) 按 `slug` 保存报价、正文摘要、在华时间和随访或恢复节点。价格包括币种、下限、可选上限和计价单位。目录、详情与 FAQ 共用 `getServicePricing`。优先显示运营方确认的估价，其次展示带来源的公开参考价，两者都缺失时引导询价。详情页注明参考资料核对日期，来源未给出计价单位时显示“unit to confirm”。
- 从项目详情页链接到 `/consultation?service=cataract-treatment` 这样的 URL。缺失或不识别的值让用户自行选择。姓名、电话、邮箱、留言只通过表单正文传递。
- `PUBLIC_WHATSAPP_NUMBER` 使用带国家码的纯数字。配置有效时才显示号码对应的 WhatsApp 链接，未配置时保留站内咨询入口。所有链接指向项目方自己的联系方式。

## 咨询接口

[请求与响应类型](../src/contracts/consultations.ts) 由表单和邮件接口共享。浏览器向同域 `/api/consultations` 提交 `application/json`。

```json
{
  "name": "Example Visitor",
  "email": "visitor@example.test",
  "phone": "+1 202 555 0142",
  "country": "Canada",
  "service": "cataract-treatment",
  "message": "Please confirm the estimated stay and whether the quote is per eye."
}
```

姓名、邮箱、电话、国家和服务为必填项，留言可省略。接收端检查空白字段、邮箱格式和服务标识。提交成功表示邮件服务已接受发送请求。实际收件由指定测试邮箱在集成时验证。

| HTTP 状态 | JSON 响应 | 适用情况 |
| --- | --- | --- |
| 200 | `{"ok":true}` | 邮件服务已接受 |
| 400 | `{"ok":false,"error":"invalid_request"}` | JSON 无效、必填项错误或服务标识无效 |
| 405 | `{"ok":false,"error":"method_not_allowed"}` | 使用了 POST 以外的方法 |
| 502 | `{"ok":false,"error":"delivery_failed"}` | 邮件服务拒绝、超时或无法连接 |
| 503 | `{"ok":false,"error":"unavailable"}` | 邮件发送配置尚未就绪 |

表单在发送期间禁用重复提交。失败时保留已填内容，同时展示重试和已配置的联系方式。接口使用部署环境设置的发件人、收件人及邮件服务凭据。访客邮箱用作回复地址，接待团队从自己的邮箱跟进咨询。

## 并行开发与集成

1. 各模块使用当前仓库已有的基础布局、项目清单和 TypeScript 类型，从独立分支发起 PR。在各工作单列出的目录内实现功能。
2. 前端可模拟上述响应，接口可注入模拟邮件服务。报价、医生和案例可在本地测试夹具中提供演示样本。正式资料缺失时验证对应的缺省状态。
3. 各 PR 分别运行 `npm run check` 和 `npm run build`。全站链接、26 页总数和收件箱送达在模块合并后集中验收，步骤见 [README](../README.md#合并后验收)。
