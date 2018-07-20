import katex from 'katex'

export const tokenTypes = {
  _: {
    name: 'ITALIC',
    start: '<em>_',
    end: '_</em>',
    collapsable: false,
    processor: null
  },
  '*': {
    name: 'BOLD',
    start: '<strong>*',
    end: '*</strong>',
    collapsable: false,
    processor: null
  },
  $: {
    name: 'MATH',
    start: '<span class="math-inline">$',
    end: '$</span>',
    collapsable: false,
    processor: processKatexString
  },
  $$: {
    name: 'MATHBLOCK',
    start: '<div class="math-block">$$',
    end: '$$</div>',
    collapsable: false,
    processor: processKatexString
  },
  '⌘': {
    name: 'CARET',
    start: '<span id="caret-position">',
    end: '</span>',
    collapsable: true,
    processor: null
  },
  '\n': {
    name: 'NEWLINE',
    start: '',
    end: '',
    collapsable: false,
    processor: null
  }
}

function processKatexString(mathStr) {
  return katex.renderToString(mathStr, {
    throwOnError: false,
    colorIsTextColor: false
  })
}

function replaceTokenWithHtml(matchNTokens, match) {
  const justTokens = matchNTokens.replace(match, '')
  const token = justTokens.substr(0, justTokens.length / 2)
  const tokenType = getTokenType(token)
  return `${tokenType.start}${
    tokenType.processor ? tokenType.processor(match) : match
  }${tokenType.end}`
}

function replaceStringWithTokenized(str, token) {
  const tokenType = getTokenType(token)
  const reg = new RegExp(
    `\\${token}(.${tokenType.collapsable ? '*' : '+'}?)\\${token}`,
    'g'
  )
  return str.replace(reg, replaceTokenWithHtml)
}

function getTokenType(token) {
  return tokenTypes[token]
}

export default function markdownToHTML(str = '') {
  const sanitizedString = str.trim()

  const newStr = Object.keys(tokenTypes).reduce(
    replaceStringWithTokenized,
    sanitizedString
  )
  return `<p class="card-size">${newStr}</p>`
}
