# Aesthetics

审美需要先“看见”美的类型，才更容易被训练出来。

作为工程师，我做这个项目的出发点很简单：我可以理解系统、代码和产品行为，但审美判断需要词汇。只有当我知道一种视觉世界叫什么、它由哪些元素构成，我才更容易表达“更优雅一点”“更 editorial 一点”“不要那么 SaaS”“更 cyberpunk”“更克制”到底是什么意思。

这个 repo 是一个公开的视觉风格 workbook：收集设计风格、视觉 aesthetic 名称，以及可复用的 image generation prompts。

[English README](README.md)

## 这是什么

这是一个从大类到细分赛道学习视觉风格的实用参考。

目前包含：

- **337 个可复用的图片生成 prompt**，覆盖艺术史、平面设计、UI、建筑、室内、产品、电影、游戏、时尚、材料和互联网 aesthetic。
- **40 张 style-show 示例图**，每张都尽量选择最适合该风格的原生场景，而不是强行用同一个主题展示所有风格。
- 风格索引、学习路径、覆盖审计、prompt 指南，以及可重跑的图片生成源 prompt。

这个项目不是为了定义最终标准答案，而是为了帮助工程师、设计师、艺术创作者、教育者和所有感兴趣的人拥有一套共同的视觉词汇。

## 为什么要做

很多时候我们会说“设计再好一点”，但其实没有足够准确的语言描述“好”到底是哪种好。对工程师和产品建设者来说尤其如此：我们知道哪里不对，但不一定知道自己想要的是：

- Swiss International 的清晰
- Art Deco 的华丽
- Neo-Brutalist 的直接
- Wabi-Sabi 的安静
- Frutiger Aero 的乐观
- Cyberpunk 的高密度
- Minimalism 的减法
- Risograph 的印刷质感
- Parametricism 的建筑流动感
- Cozy Game 的温暖

这个 workbook 把这些名字转化成具体视觉标记和可复用 prompt。

## 从这里开始

- [STYLE_INDEX.md](STYLE_INDEX.md)：从大类到细分风格名的索引。
- [LEARNING_PATH.md](LEARNING_PATH.md)：如何通过对比训练视觉判断。
- [AUDIT.md](AUDIT.md)：当前覆盖了什么、缺了什么、为什么还要继续扩展。
- [prompts/all-prompts.md](prompts/all-prompts.md)：第一批 180 个可复用 prompt。
- [prompts/expanded-style-prompts.md](prompts/expanded-style-prompts.md)：新增 157 个更细分 prompt。
- [examples/style-show/style-show-index.md](examples/style-show/style-show-index.md)：生成的视觉示例。
- [examples/style-show/style-show-prompts.md](examples/style-show/style-show-prompts.md)：生成图片用的源 prompt。

## 如何使用 prompt

选择一个风格，复制 prompt，然后替换 `{{SUBJECT}}`。

示例：

```text
Create {{SUBJECT}} in Cyberpunk style: dense neon city atmosphere, wet reflective surfaces, magenta-cyan contrast, layered screens, worn high-tech materials, surveillance signage, deep night shadows. Avoid clean corporate minimalism and pastel softness.
```

替换占位符：

```text
Create a coffee shop loyalty app home screen in Cyberpunk style: dense neon city atmosphere, wet reflective surfaces, magenta-cyan contrast, layered screens, worn high-tech materials, surveillance signage, deep night shadows. Avoid clean corporate minimalism and pastel softness.
```

## 欢迎共建

这个 repo 欢迎各色职业和兴趣爱好者一起共建：

- 设计师和艺术指导
- 工程师和产品建设者
- 插画师、摄影师、电影创作者、游戏美术
- 建筑师、室内设计师、时尚从业者、品牌策略师
- 教育者、学生、研究者、兴趣爱好者
- 任何想建立视觉审美词汇的人

适合贡献的内容包括：

- 补充缺失的风格名称
- 改进 prompt
- 添加更好的展示场景
- 修正视觉标记
- 翻译风格描述
- 整理更好的学习路径
- 添加生成图片和对应源 prompt

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 说明

生成图片是教学示例，不是最终权威。很多风格会互相重叠，有些名称来自互联网文化，有些是艺术运动，有些是材料、媒介、时代或情绪。这种混杂本来就是视觉文化的一部分。

添加 prompt 时，请避免模仿在世艺术家和受版权保护的系列作品。优先描述视觉成分：色彩、构图、材料、时代、字体、表面、光线，以及需要排除的错误方向。

