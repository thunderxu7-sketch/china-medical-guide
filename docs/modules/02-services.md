# 02 服务目录与 14 个项目详情页

## 目标

交付 `/services` 和 14 个可直达的静态详情页。让访客能查明项目费用、计价单位、在华停留时间和恢复时间，再带着选定项目发起咨询。

## 文件归属

- `src/pages/services/`、`src/features/services/`、`public/media/services/`
- `src/data/service-details.ts` 由本模块维护，项目名称和 slug 读取 `src/data/services.ts`。

## 交付内容

用一份详情模板和 `getStaticPaths()` 生成 14 个项目。目录按 4 个分类展现项目，价格使用同一数据记录。明确单眼、单次、每月等单位，分别呈现在华与恢复时间。未经确认的价格用询价入口呈现。

## 独立验收

- [ ] `npm run build` 产生 1 个目录页和恰好 14 个详情页，目录中的每个 slug 只出现一次。
- [ ] 用测试记录分别检查按单眼、按次、按月计价及缺少报价时的展示。列表和详情使用同一价格及单位。
- [ ] 每个详情的咨询链接符合 `/consultation?service=<slug>`，所有 slug 都在公共清单内。
- [ ] 直接打开、刷新项目页可获得含标题和内容的 HTML，`npm run check` 通过。

接口、数据和路由见[首版公共约定](../contracts.md)。
