/* eslint-disable prefer-arrow-callback */

export default {}

import lib from '../test-lib.mjs'

const {
  parse,
  parseToHtml,
  test,
} = lib

// TESTS MUST BE SYNC WITH THE ONES IN THE NODE.JS REPO
// DO NOT CHANGE

test('Escape characters are removed in parsed element', function (t) {
  const input = '- Some \\*text*'
  const opt = {
    onUnorderedList: ulNode => {
      const liNode = ulNode.firstChild

      t.equal(liNode.textContent, 'Some *text*', 'textContent in callback is valid')
    },
  }

  t.plan(1)
  parse(input, opt)
  t.end()
})

test('Escape "*"', function (t) {
  const input = 'Some \\*text*'
  const output = '<p>Some *text*</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "["', function (t) {
  const input = 'This is a \\[link](https://example.com)'
  const output = '<p>This is a [link](https://example.com)</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "`"', function (t) {
  const input = 'A \\`code` text'
  const output = '<p>A `code` text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "`" in multiline codes', function (t) {
  const input = '```\nA \\` backquote\n```'
  const output = '<pre><code>A ` backquote</code></pre>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "!"', function (t) {
  const input = '\\![link](https://example.com)'
  const output = '<p>!<a href="https://example.com">link</a></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "#"', function (t) {
  const input = '\\# Title escaped'
  const output = '<p># Title escaped</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "~"', function (t) {
  const input = 'A \\~~strikethrough~~ text'
  const output = '<p>A ~~strikethrough~~ text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "^"', function (t) {
  const input = 'A \\^superscript text'
  const output = '<p>A ^superscript text</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape "\\"', function (t) {
  const input = 'A backslash: \\'
  const output = '<p>A backslash: \\</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Keep escaped char if not followed by a special char', function (t) {
  const input = 'Useless \\, backslash'
  const output = '<p>Useless \\, backslash</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})
