# Data Notes

`api-batch-template.jsonl` is a shape template for turning the workbook prompts into API batch input. The complete human-readable prompt source is:

```text
../prompts/all-prompts.md
```

For API use, copy one prompt block, replace `{{SUBJECT}}`, then place it into the JSONL `body.prompt` field.

