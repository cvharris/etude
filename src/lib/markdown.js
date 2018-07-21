import katex from 'katex'
import isString from 'lodash/isString'
import markdownit from 'markdown-it'
import math from 'markdown-it-math'

class Markdown {
  constructor(options) {
    const defaultOptions = {
      typographer: true,
      linkify: true,
      html: true,
      xhtmlOut: false,
      breaks: true,
      highlight: (str, lang) => ''
    }
    const updatedOptions = Object.assign(defaultOptions, options)
    this.md = markdownit(updatedOptions)

    this.md.disable(['heading', 'table', 'code']).use(math, {
      inlineOpen: '$',
      inlineClose: '$',
      blockOpen: '$$',
      blockClose: '$$',
      inlineRenderer: function(str) {
        let output = ''
        try {
          output = katex.renderToString(str.trim())
        } catch (err) {
          output = `<span class="katex-error">${err.message}</span>`
        }
        return output
      },
      blockRenderer: function(str) {
        let output = ''
        try {
          output = katex.renderToString(str.trim(), { displayMode: true })
        } catch (err) {
          output = `<div class="katex-error">${err.message}</div>`
        }
        return output
      }
    })
  }

  render(content) {
    if (!isString(content)) content = ''
    const rendered = this.md.render(content)
    const el = document.createElement('div')
    el.innerHTML = rendered
    return el.outerHTML
  }
}

export default Markdown
