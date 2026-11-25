# 05 咨询表单与项目预选

## 目标

交付英文 `/consultation` 页面。访客从详情页发起咨询时能保留已选项目，提交失败时可重试或通过已配置的 WhatsApp 联系。

## 文件归属

- `src/pages/consultation.astro`、`src/features/consultation-form/`
- 前端读取 `src/data/services.ts` 和 `src/contracts/consultations.ts`。

## 交付内容

从项目清单生成选项。解析 `?service=<slug>` 并处理空值或未知 slug。按照公共类型向同域接口 POST JSON，显示校验、发送中、成功和失败状态。

## 独立验收

- [ ] 下拉菜单覆盖全部 14 个项目，包括骨折保守治疗和运动损伤治疗。
- [ ] 从白内障详情使用的 URL 打开会预选 `cataract-treatment`，未知 slug 可手动选择。
- [ ] 用模拟响应验证成功、无效输入、发送失败和服务未配置。重复点击提交不产生多个并发请求，失败后输入仍在。
- [ ] 模拟接口时在本机完成验收，核对请求字段和 URL，`npm run check`、`npm run build` 通过。

接口、数据和路由见[首版公共约定](../contracts.md)。
