import * as html2pdf from 'html2pdf.js'
window.html2pdf = html2pdf

class PrintCards {
  constructor(cards = []) {
    this.cardsToPrint = cards
    const html = cards.reduce((pdfHtml, card, i) => {
      const frontHtml = i === 0 ? card.front.renderedText : this.addPageBreak(card.front.renderedText)
      return `${pdfHtml}${frontHtml}${this.addPageBreak(card.back.renderedText)}`
    }, '')
    html2pdf(this.htmlToElement(html), {
      jsPDF: {
        orientation: 'l',
        unit: 'in',
        format: [5, 3]
      }
    })
  }

  addPageBreak(html = '') {
    return `<div class="html2pdf__page-break"></div>${html}`
  }

  htmlToElement(html) {
    var template = document.createElement('div')
    html = html.trim() // Never return a text node of whitespace as the result
    html = `<div>${html}</div>`
    template.innerHTML = html
    return template.firstChild
  }
}

export default PrintCards