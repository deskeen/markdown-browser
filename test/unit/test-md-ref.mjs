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

test('Reference with a single ref', function (t) {
  const input = `
    See reference[^1]

    [^1]: some text`

  const output = inlineHtml`
    <p>See reference<a href="#reference1"><sup>1</sup></a></p>
    <section>
      <ol>
        <li id="reference1">some text</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with 2 refs', function (t) {
  const input = `
    See this[^1] and that[^2]

    [^1]: ref one
    [^2]: ref two`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
        <li id="reference2">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with 2 refs not in order', function (t) {
  const input = `
    See this[^1] and that[^2]
    [^2]: ref two
    [^1]: ref one`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
        <li id="reference2">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with two ids below text', function (t) {
  const input = `
    See this[^one] and that[^two]

    [^one]: ref one
    [^two]: ref two`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
        <li id="reference2">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with two ids above text', function (t) {
  const input = `
    [^one]: ref one
    [^two]: ref two

    See this[^one] and that[^two]`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
        <li id="reference2">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with two ids in between text lines', function (t) {
  const input = `
    See this[^one]
    [^one]: ref one

    And that[^two]
    [^two]: ref two`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a></p>
    <p>And that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
        <li id="reference2">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with missing ref key', function (t) {
  const input = `
    See this[^one] and that

    [^one]: ref one
    [^two]: ref two`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that</p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with missing ref text', function (t) {
  const input = `
    See this[^one] and that[^two]

    [^one]: ref one`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference2"><sup>2</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with two ids', function (t) {
  const input = `
    See this[^one] and that[^one]

    [^one]: ref one`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a> and that<a href="#reference1"><sup>1</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref one</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with two notes', function (t) {
  const input = `
    See this[^one]

    [^one]: ref one
    [^one]: ref two`

  const output = inlineHtml`
    <p>See this<a href="#reference1"><sup>1</sup></a></p>
    <section>
      <ol>
        <li id="reference1">ref two</li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with complex texts', function (t) {
  const input = `
    See reference[^1]

    [^1]: some *italic* and **bold** and a [link](address)`

  const output = inlineHtml`
    <p>See reference<a href="#reference1"><sup>1</sup></a></p>
    <section>
      <ol>
        <li id="reference1">some <em>italic</em> and <strong>bold</strong> and a <a href="address">link</a></li>
      </ol>
    </section>`

  const opt = {
    allowFootnote: true,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})

test('Reference with callback', function (t) {
  const input = `
    See reference[^1]

    [^1]: some text`

  const opt = {
    allowFootnote: true,
    onReference: node => {
      t.notEqual(node, null, 'Parameter is populated')
      t.equal(node.tagName, 'A', 'Tagname is valid')
      t.notEqual(node.firstChild, '1', 'firstChild is there')
      t.end()
    },
  }

  parse(input, opt)
})

test('Reference with allowReference to false', function (t) {
  const input = `
    See reference[^1]

    [^1]: some text`

  const output = inlineHtml`
    <p>See reference[<sup>1</sup>]</p>
    <p>[<sup>1</sup>]: some text</p>`

  const opt = {
    allowReference: false,
  }

  t.equal(parseToHtml(input, opt), output, 'Output is valid')
  t.end()
})
