/* eslint-disable prefer-arrow-callback */

export default {}

import lib from '../test-lib.mjs'

const {
  parseToHtml,
  test,
} = lib

// TESTS MUST BE SYNC WITH THE ONES IN THE NODE.JS REPO
// DO NOT CHANGE

test('Text', function (t) {
  const input = 'My name is James Bond'
  const output = '<p>My name is James Bond</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Paragraph', function (t) {
  const input = 'Line 1\n\nLine 2'
  const output = '<p>Line 1</p><p>Line 2</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Paragraph with extra newlines', function (t) {
  const input = 'Line 1\n\n\n\nLine 2'
  const output = '<p>Line 1</p><p>Line 2</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Line of spaces are considered empty', function (t) {
  const input = 'Line 1\n  \nLine 2'
  const output = '<p>Line 1</p><p>Line 2</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Italic', function (t) {
  const input = 'An *italic* text'
  const output = '<p>An <em>italic</em> text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Bold', function (t) {
  const input = 'A **bold** text'
  const output = '<p>A <strong>bold</strong> text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Bold-italic', function (t) {
  const input = 'A ***bold-italic*** text'
  const output = '<p>A <strong><em>bold-italic</em></strong> text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Emphasis with leading space', function (t) {
  const input = 'An * italic* text'
  const output = '<p>An * italic* text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Emphasis with trailing space', function (t) {
  const input = 'An *italic * text'
  const output = '<p>An *italic * text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Emphasis with wrong end tag inside: space+*', function (t) {
  const input = 'An *italic *tes t* text'
  const output = '<p>An <em>italic *tes t</em> text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Strikethrough', function (t) {
  const input = 'A ~~strikethrough~~ text'
  const output = '<p>A <s>strikethrough</s> text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Superscript without parenthesis', function (t) {
  const input = 'A formula x^2 + y^3 + z^10'
  const output = '<p>A formula x<sup>2</sup> + y<sup>3</sup> + z<sup>10</sup></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Superscript with parenthesis', function (t) {
  const input = 'A formula x^(2) + y^(a - b)'
  const output = '<p>A formula x<sup>2</sup> + y<sup>a - b</sup></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})
