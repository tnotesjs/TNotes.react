// RFC 提交流程
const submissionProcess = [
  '1. 在 Discussions 中讨论初步想法',
  '2. Fork reactjs/rfcs 仓库',
  '3. 复制 0000-template.md 为新文件',
  '4. 填写 RFC 文档（参考模板）',
  '5. 提交 Pull Request',
  '6. 参与讨论，根据反馈修改',
  '7. 等待核心团队评审和决策',
]

// RFC 文档模板结构
const rfcTemplate = `
# [RFC 标题]

- Start Date: (填写今天的日期)
- RFC PR: (留空，PR 创建后会自动填充)
- React Issue: (如果有相关 issue)

## Summary

一段话概述这个提案。

## Basic example

如果提案涉及新的或修改的 API，请在此展示基本用例。

## Motivation

为什么我们需要这个改变？
它解决了什么问题？
预期的用例是什么？

## Detailed design

这是 RFC 的核心部分。详细解释设计，包括：
- 新 API 的完整说明
- 如何与现有系统集成
- 边界情况处理
- 性能影响

## Drawbacks

为什么我们不应该这样做？

## Alternatives

还考虑了哪些替代设计？

## Adoption strategy

如果实现此提案，现有代码会受到什么影响？
如何帮助用户迁移？

## Unresolved questions

哪些问题还未解决？
`
