---
'@citolab/prose-qti': patch
---

`qtiSimpleChoiceParagraph` and `qtiPromptParagraph` accept an image. Both were `text*`, so an
`<img>` authored inside a `qti-simple-choice` or a `qti-prompt` — a picture as the answer itself —
was dropped silently on import, and a pasted one was flattened to its `alt` text. Widened to
`(text | image)*`, leaving the other inline nodes out.
