import markdownit from 'markdown-it'
import math from 'markdown-it-math'
import katex from 'katex'
import isString from 'lodash/isString'

class Markdown {

  constructor(options) {
    const defaultOptions = {
      typographer: true,
      linkify: true,
      html: false,
      xhtmlOut: false,
      breaks: false,
      highlight: function (str, lang) {
        return ''
      }
    }
    const updatedOptions = Object.assign(defaultOptions, options)
    this.md = markdownit(updatedOptions)

    this.md
      .disable(['heading', 'table', 'code'])
      .use(math, {
        inlineOpen: '$',
        inlineClose: '$',
        blockOpen: '$$',
        blockClose: '$$',
        inlineRenderer: function (str) {
          let output = ''
          try {
            output = katex.renderToString(str.trim())
          } catch (err) {
            output = `<span class="katex-error">${err.message}</span>`
          }
          return output
        },
        blockRenderer: function (str) {
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
    return this.md.render(content)
  }

}

export default Markdown
