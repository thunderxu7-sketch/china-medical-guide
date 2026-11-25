# 03 医生目录、医生档案与患者故事

## 目标

交付 `/doctors`、`/doctors/orthopedic`、`/doctors/ophthalmology` 和 `/testimonials`。医生及案例采用结构化资料，供后续替换和核对。

## 文件归属

- `src/pages/doctors/`、`src/pages/testimonials.astro`
- `src/features/specialists/`、`src/features/stories/`、`public/media/people/`

## 交付内容

使用同一档案模板生成两个专科详情。把医生姓名、执业机构、资料来源和允许公开的案例作为可选字段。缺少获准发布的资料时呈现专科介绍、咨询入口或暂无案例状态。

## 独立验收

- [ ] 构建产物含全部 4 个路径，医生目录可进入两个专科详情。
- [ ] 用本地演示样本验证完整档案和案例展示，再用空数据验证缺省状态。
- [ ] 客户端可见的正式文案中，医生身份、院方合作和案例均可追溯到项目方提供的材料。
- [ ] 使用仓库的基础布局独立预览，`npm run check`、`npm run build` 均通过。

接口、数据和路由见[首版公共约定](../contracts.md)。
