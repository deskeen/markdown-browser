/* eslint-disable prefer-arrow-callback */

export default {}

import lib from '../test-lib.mjs'

const {
  parse,
  parseToHtml,
  inlineHtml,
  test,
} = lib

// TESTS MUST BE SYNC WITH THE ONES IN THE NODE.JS REPO
// DO NOT CHANGE

test('Horizontal line', function (t) {
  const input = `
    Pre line text

    ---

    Post line text`

  const output = inlineHtml`
    <p>Pre line text</p>
    <hr>
    <p>Post line text</p>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Horizontal line without pre-newline', function (t) {
  const input = `
    Pre line text
    ---

    Post line text`

  const output = inlineHtml`
    <p>Pre line text<br>---</p>
    <p>Post line text</p>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Horizontal line without pre-newline', function (t) {
  const input = `
    Pre line text

    ---
    Post line text`

  const output = inlineHtml`
    <p>Pre line text</p>
    <p>---<br>Post line text</p>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Horizontal line with list before/after', function (t) {
  const input = `
    - List 1

    ---

    - List 2`

  const output = inlineHtml`
    <ul>
      <li>List 1</li>
    </ul>
    <hr>
    <ul>
      <li>List 2</li>
    </ul>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Horizontal line with callback', function (t) {
  const input = `
    Pre line text

    ---

    Post line text`

  const opt = {
    onHorizontalLine: node => {
      t.notEqual(node, null, 'Parameter is populated')
      t.equal(node.tagName, 'HR', 'Tagname is valid')
      t.end()
    },
  }

  parse(input, opt)
})

test('Horizontal line with allowHorizontalLine flag to false', function (t) {
  const input = `
    Pre line text

    ---

    Post line text`

  const output = inlineHtml`
    <p>Pre line text</p>
    <p>---</p>
    <p>Post line text</p>`
  const opt = {
    allowHorizontalLine: false,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})
