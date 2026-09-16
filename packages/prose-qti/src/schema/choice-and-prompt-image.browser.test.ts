/**
 * QTI permits an `<img>` inside a choice and inside a prompt, and authors use it: a picture as the
 * answer itself. Both paragraphs were `text*`, so the parser dropped such an image on import
 * without reporting anything.
 *
 * `(text | image)*` rather than `inline*`: whether an interaction may nest inside an answer option
 * is a separate question, and `qtiPromptParagraph` already documents what a broad rule does to
 * `findWrapping`. The last test keeps that line drawn.
 */
import { describe, expect, test } from 'vitest';

import { createQtiSchema } from './create-qti-schema.js';

import type { Schema } from 'prosemirror-model';

const schema: Schema = createQtiSchema();

const PARAGRAPHS = ['qtiSimpleChoiceParagraph', 'qtiPromptParagraph'];

function accepts(paragraph: string, child: string): boolean {
  return schema.nodes[paragraph].contentMatch.matchType(schema.nodes[child]) !== null;
}

describe('an image inside a choice or a prompt', () => {
  test.each(PARAGRAPHS)('%s accepts an image', name => {
    expect(accepts(name, 'image')).toBe(true);
  });

  test.each(PARAGRAPHS)('%s still accepts text', name => {
    expect(accepts(name, 'text')).toBe(true);
  });

  test.each(PARAGRAPHS)('%s stays closed to the other inline nodes', name => {
    expect(accepts(name, 'qtiGap')).toBe(false);
  });
});
