import markdownToHTML from './markdowner'

describe('markdowner', () => {
  it('markdowner converts a string and returns a string with HTML', () => {
    const input = 'derp *de* derp'
    const output = '<div class="card-size">derp <strong>de</strong> derp</div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles multiple tags', () => {
    const input = 'derp *de* _derp_'
    const output =
      '<div class="card-size">derp <strong>de</strong> <u>derp</u></div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles math tags', () => {
    const input = 'derp *de* $a = 2$ _derp_'
    const outputStart =
      '<div class="card-size">derp <strong>de</strong> <span class="math-inline"><span class="katex">'
    const outputEnd = '</span> <u>derp</u></div>'

    const processed = markdownToHTML(input)
    expect(processed.startsWith(outputStart)).toBeTruthy()
    expect(processed.endsWith(outputEnd)).toBeTruthy()
  })

  it('matches multiple instances of the same', () => {
    const input = '*derp* _de_ *de* _derp_'
    const output =
      '<div class="card-size"><strong>derp</strong> <u>de</u> <strong>de</strong> <u>derp</u></div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles tags within tags', () => {
    const input = 'derp _*de*_ _derp_'
    const output =
      '<div class="card-size">derp <u><strong>de</strong></u> <u>derp</u></div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles caret position passed in middle of string', () => {
    const input = 'derp *de* ⌘⌘derp'
    const output =
      '<div class="card-size">derp <strong>de</strong> <span id="caret-position"></span>derp</div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles caret position passed in middle of string', () => {
    const input = 'derp *de* ⌘⌘derp'
    const output =
      '<div class="card-size">derp <strong>de</strong> <span id="caret-position"></span>derp</div>'

    expect(markdownToHTML(input)).toEqual(output)
  })

  it('handles multiline', () => {
    const input = `
      derp
      a
    `
    const output = 'derp<br />a'

    expect(markdownToHTML(input)).toEqual(output)
  })
})
