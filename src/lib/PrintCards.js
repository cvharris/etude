import * as html2pdf from 'html2pdf.js'
window.html2pdf = html2pdf

const openTag =
  '<div style="display: flex; height: 3.75in; width: 5.75in; justify-content: center; align-items: center;">'

class PrintCards {
  constructor(cards = [], deckName = '') {
    const html = cards.reduce((pdfHtml, card, i) => {
      const frontHtml =
        i === 0
          ? `${openTag}${card.front.renderedText}</div>`
          : this.addPageBreak(card.front.renderedText)
      return `${pdfHtml}${frontHtml}${this.addPageBreak(
        card.back.renderedText
      )}`
    }, '')
    html2pdf(this.htmlToElement(html), {
      filename: `Etude ${deckName} Cards.pdf`,
      jsPDF: {
        orientation: 'l',
        unit: 'in',
        format: [6, 4]
      }
    })
  }

  addPageBreak(html = '') {
    return `<div class="html2pdf__page-break"></div>${openTag}${html}</div>`
  }

  htmlToElement(html) {
    let template = document.createElement('div')
    html = html.trim() // Never return a text node of whitespace as the result
    html = `<div>${html}</div>`
    template.innerHTML = html
    return template.firstChild
  }
}

export default PrintCards
