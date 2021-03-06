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

test('Link', function (t) {
  const input = 'This is a [link](https://example.com)'
  const output = '<p>This is a <a href="https://example.com">link</a></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Link with callback', function (t) {
  const input = 'This is a [link](https://example.com)'
  const opt = {
    onLink: node => {
      t.notEqual(node, null, 'Parameter is populated')
      t.equal(node.tagName, 'A', 'Tagname is valid')
      t.equal(node.getAttribute('href'), 'https://example.com', 'href attribute is valid')
      t.equal(node.textContent, 'link', 'Content is valid')
      t.end()
    },
  }

  parse(input, opt)
})

test('Link in italic', function (t) {
  const input = 'This is *a [link](https://example.com) in italic*'
  const output = '<p>This is <em>a <a href="https://example.com">link</a> in italic</em></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Link with allowLink flag to false', function (t) {
  const input = 'This is a [link](https://example.com)'
  const output = '<p>This is a [link](https://example.com)</p>'
  const opt = {
    allowLink: false,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})
