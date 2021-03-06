/* eslint-disable prefer-arrow-callback */

export default {}

import lib from '../test-lib.mjs'

const {
  parse,
  parseToHtml,
  test,
  document,
} = lib

// TESTS MUST BE SYNC WITH THE ONES IN THE NODE.JS REPO
// DO NOT CHANGE

test('Element tagName', function (t) {
  const element = document.createElement('p')

  t.equal(element.tagName, 'P', 'tagName is uppercase')
  t.end()
})

test('Element.hasAttribute', function (t) {
  const element = document.createElement('p')

  t.equal(typeof element.hasAttribute, 'function', 'hasAttribute is a function')
  t.equal(element.hasAttribute('test'), false, 'hasAttribute is valid when false')

  element.setAttribute('test', 'value')

  t.equal(element.hasAttribute('test'), true, 'hasAttribute is valid when true')
  t.end()
})

test('Element.setAttribute/getAttribute', function (t) {
  const element = document.createElement('p')

  t.equal(typeof element.getAttribute, 'function', 'getAttribute is a function')
  t.equal(typeof element.setAttribute, 'function', 'setAttribute is a function')

  t.throws(() => {
    element.setAttribute()
  }, TypeError, 'setAttribute throws when 0 argument')

  t.throws(() => {
    element.setAttribute('test')
  }, TypeError, 'setAttribute throws when 1 argument')

  element.setAttribute('test', undefined)
  t.equal(element.getAttribute('test'), 'undefined', 'setAttribute works with undefined')

  element.setAttribute('test', null)
  t.equal(element.getAttribute('test'), 'null', 'setAttribute works with null')

  element.setAttribute('test', 1)
  t.equal(element.getAttribute('test'), '1', 'setAttribute works with a number')

  element.setAttribute('test', true)
  t.equal(element.getAttribute('test'), 'true', 'setAttribute works with a boolean')
  t.end()
})

test('Element.setAttribute with HTML special chars in attribute name', function (t) {
  const element = document.createElement('p')

  try {
    element.setAttribute('<', 'value')
  } catch (err) {
    t.notLooseEqual(err, null, '_<_ throws')
  }

  try {
    element.setAttribute('>', 'value')
  } catch (err) {
    t.notLooseEqual(err, null, '_>_ throws')
  }

  try {
    element.setAttribute('&', 'value')
  } catch (err) {
    t.notLooseEqual(err, null, '_&_ throws')
  }

  try {
    element.setAttribute('"', 'value')
  } catch (err) {
    t.notLooseEqual(err, null, '_"_ throws')
  }

  try {
    element.setAttribute('\'', 'value')
  } catch (err) {
    t.notLooseEqual(err, null, '_\'_ throws')
  }

  t.end()
})

test('Element.removeAttribute', function (t) {
  const element = document.createElement('p')

  t.equal(typeof element.removeAttribute, 'function', 'removeAttribute is a function')

  element.setAttribute('test', 'value')

  const output = element.removeAttribute('test')

  t.equal(output, undefined, 'removeAttribute returns the right value')
  t.equal(element.hasAttribute('test'), false, 'removeAttribute works')
  t.end()
})

test('Element.textContent with one element', function (t) {
  const element = document.createElement('p')
  element.textContent = 'Some text'

  t.equal(element.textContent, 'Some text', 'textContent is valid')
  t.end()
})

test('Element.textContent sets to null', function (t) {
  const element = document.createElement('div')
  element.setAttribute('foo', 'bar')
  element.append(document.createElement('p'))
  element.append(document.createElement('p'))
  element.textContent = null

  t.equal(element.outerHTML, '<div foo="bar"></div>', 'textContent is valid')
  t.end()
})

test('Element.textContent sets to empty string', function (t) {
  const element = document.createElement('div')
  element.setAttribute('foo', 'bar')
  element.append(document.createElement('p'))
  element.append(document.createElement('p'))
  element.textContent = ''

  t.equal(element.outerHTML, '<div foo="bar"></div>', 'textContent is valid')
  t.end()
})

test('Element.textContent with multiple element', function (t) {
  const item1Node = document.createElement('li')
  item1Node.textContent = 'Item 1'

  const item2Node = document.createElement('li')
  item2Node.textContent = 'Item 2'

  const element = document.createElement('ul')
  element.appendChild(item1Node)
  element.appendChild(item2Node)

  const output = 'Item 1Item 2'

  t.equal(element.textContent, output, 'textContent is valid')
  t.end()
})

test('Element.textContent with embedded element', function (t) {
  const input = 'Text with *italic*'
  const textContent = 'Text with italic'
  const element = parse(input)

  t.equal(element.textContent, textContent, 'textContent is valid')
  t.end()
})

test('Element.textContent with image', function (t) {
  const input = '![Caption](image_url)'
  const textContent = 'Caption'
  const element = parse(input)

  t.equal(element.textContent, textContent, 'textContent is valid')
  t.end()
})

test('Element.textContent with void element', function (t) {
  const input = 'Pre-img![caption](link)Post img'
  const textContent = 'Pre-imgPost img'
  const element = parse(input)

  t.equal(element.textContent, textContent, 'textContent is valid')
  t.end()
})

test('Element.innerHTML, Element.outerHTML', function (t) {
  const input = 'This is a text'
  const element = parse(input)
  const innerHtmlOutput = '<p>This is a text</p>'
  const outerHtmlOutput = '<div><p>This is a text</p></div>'

  t.equal(element.innerHTML, innerHtmlOutput, 'innerHTML output is valid')
  t.equal(element.outerHTML, outerHtmlOutput, 'outerHTML output is valid')
  t.end()
})

test('Escape HTML special chars in attribute value', function (t) {
  const input = 'My evil image ![<>&"\'](some_url)'
  const output = '<p>My evil image <img src="some_url" alt="<>&amp;&quot;\'"></p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Escape HTML special chars in content', function (t) {
  const input = '<>&"\''
  const output = '<p>&lt;&gt;&amp;"\'</p>'

  t.equal(parseToHtml(input), output, 'Output is valid')
  t.end()
})

test('Element.id get/set', function (t) {
  const input = '# Title'
  const output = '<h1 id="some-id">Title</h1>'
  const opt = {
    onHeader: headerNode => {
      headerNode.id = 'some-id'

      t.equal(headerNode.id, 'some-id', 'Element.id output is valid')
      t.equal(headerNode.getAttribute('id'), 'some-id', 'Element.getAttribute("id") output is valid')
    },
  }

  t.equal(parseToHtml(input, opt), output, 'output is valid output is valid')
  t.end()
})

test('Element.className get/set', function (t) {
  const input = '# Title'
  const output = '<h1 class="some-class">Title</h1>'
  const opt = {
    onHeader: headerNode => {
      headerNode.className = 'some-class'

      t.equal(headerNode.className, 'some-class', 'Element.className output is valid')
      t.equal(headerNode.getAttribute('class'), 'some-class', 'Element.hasAttribute("class") output is valid')
    },
  }

  t.equal(parseToHtml(input, opt), output, 'output is valid output is valid')
  t.end()
})
