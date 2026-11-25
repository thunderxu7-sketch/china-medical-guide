# 01 公共布局与首页

## 目标

交付英文首页和所有页面共用的导航、页脚与响应式布局。访客可从首页找到项目、医生和咨询入口。

## 文件归属

- `src/layouts/BaseLayout.astro`、`src/styles/global.css`、`src/pages/index.astro`
- `src/components/site/`、`public/media/site/`
- 继续支持布局的 `title`、`description` 和默认 slot，供其他模块直接使用。

## 交付内容

按参考站的桌面和手机布局实现首页。导航和页脚使用公共约定中的网址，隐私政策与服务条款分别指向 `/privacy`、`/terms`。WhatsApp 使用项目配置的号码，未配置时引导访客前往 `/consultation`。

## 独立验收

- [ ] 首页在 390px 和 1440px 宽度下均可正常阅读，导航能用键盘和触控操作。
- [ ] 逐项核对导航、咨询和页脚链接的目标。手机端固定按钮不覆盖表单或页脚操作区。
- [ ] 首页使用英文，并具备独立的标题、描述和一个主标题。
- [ ] 用现有首页和基础布局完成预览，运行 `npm run check` 与 `npm run build`。

接口、数据和路由见[首版公共约定](../contracts.md)。
