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
      breaks: false,
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
    console.log(rendered)
    const el = document.createElement('div')
    el.innerHTML = rendered
    el.style =
      'font-size:14pt;padding:1pc;text-align:center;display:flex;align-items:center;justify-content:center;height:16pc;width:28pc;'
    return el.outerHTML
  }

  // el.style['font-size'] = '14pt'
  // el.style['padding'] = '1pc'
  // el.style['text-align'] = 'center'
  // el.style['display'] = 'flex'
  // el.style['align-items'] = 'center'
  // el.style['justify-content'] = 'center'
}

export default Markdown
