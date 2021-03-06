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

test('Image as a figure', function (t) {
  const input = '![alt text](https://example.com/image)'
  const output = inlineHtml`
    <figure>
      <img src="https://example.com/image" alt="">
      <figcaption>alt text</figcaption>
    </figure>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image as a figure surrounded by elements', function (t) {
  const input = `
    - List 1
    ![caption](https://example.com/image)
    - List 2`

  const output = inlineHtml`
    <ul>
      <li>List 1</li>
    </ul>
    <figure>
      <img src="https://example.com/image" alt="">
      <figcaption>caption</figcaption>
    </figure>
    <ul>
      <li>List 2</li>
    </ul>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image as a figure can NOT have html attr by default', function (t) {
  const input = '![alt text](https://example.com/image){style=height:100px}'
  const output = inlineHtml`
    <figure>
      <img src="https://example.com/image" alt="">
      <figcaption>alt text</figcaption>
    </figure>`

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image as a figure CAN have html attr if allowHTMLAttributes is true', function (t) {
  const input = '![alt text](https://example.com/image){style=height:100px}'
  const output = inlineHtml`
    <figure style="height:100px">
      <img src="https://example.com/image" alt="">
      <figcaption>alt text</figcaption>
    </figure>`
  const opt = {
    allowHTMLAttributes: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Image as a figure with callback', function (t) {
  const input = '![alt text](https://example.com/image)'
  const opt = {
    onImage: node => {
      t.notEqual(node, null, 'Parameter is populated')
      t.equal(node.tagName, 'IMG', 'Tagname is valid')
      t.end()
    },
  }

  parse(input, opt)
})

test('Image inline', function (t) {
  const input = 'This is an inline ![alt text](https://example.com/image)'
  const output = '<p>This is an inline <img src="https://example.com/image" alt="alt text"></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image inline at the beginning of line', function (t) {
  const input = '![alt text](https://example.com/image) was inlined'
  const output = '<p><img src="https://example.com/image" alt="alt text"> was inlined</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image with style and default allowHTMLAttributes', function (t) {
  const input = 'This is an inline ![alt text](https://example.com/image){style=height: 100px}'
  const output = '<p>This is an inline <img src="https://example.com/image" alt="alt text"></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Image with style and allowHTMLAttributes to true', function (t) {
  const input = 'This is an inline ![alt text](https://example.com/image){style="height: 100px; width: 50px"} with style'
  const output = '<p>This is an inline <img src="https://example.com/image" alt="alt text" style="height: 100px; width: 50px"> with style</p>'
  const opt = {
    allowHTMLAttributes: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Image inline with callback', function (t) {
  const input = 'This is an inline ![alt text](https://example.com/image)'
  const opt = {
    onImage: node => {
      t.notEqual(node, null, 'Parameter is populated')
      t.equal(node.tagName, 'IMG', 'Tagname is valid')
      t.end()
    },
  }

  parse(input, opt)
})
