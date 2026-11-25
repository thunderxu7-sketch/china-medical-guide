# 04 旅行支持、FAQ、关于与政策页面

## 目标

交付 `/travel`、`/faq`、`/about`、`/privacy`、`/terms`。访客能够了解出行安排、询价方式、运营方和咨询信息的用途。

## 文件归属

- `src/pages/travel.astro`、`src/pages/faq.astro`、`src/pages/about.astro`、`src/pages/privacy.astro`、`src/pages/terms.astro`
- `src/features/information/`、`public/media/information/`

## 交付内容

分别制作五个独立页面。FAQ 的项目报价从 `src/data/service-details.ts` 读取，缺失时显示询价提示。旅行页可说明接待环节，实际运营主体、已提供的服务和政策条文使用运营方确认的内容。

## 独立验收

- [ ] 5 个网址均可独立打开、刷新，具有各自的英文页面标题和描述。
- [ ] FAQ 可用键盘展开。使用测试报价验证区间与单位，再验证缺少报价时的展示。
- [ ] 隐私政策和服务条款分别打开独立正文页面。运营内容尚待确认时，预览明确标为草稿。
- [ ] 使用已有空报价数据及本地夹具完成验收，`npm run check`、`npm run build` 通过。

接口、数据和路由见[首版公共约定](../contracts.md)。
