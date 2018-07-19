import katex from 'katex'

export const tokenTypes = {
  _: 'ITALIC',
  '*': 'BOLD',
  '⌘': 'CARET',
  $: 'MATH',
  '\n': 'NEWLINE'
}

export class Token {
  constructor(type, content) {
    this.type = type
    this.content = content
  }
}

export function tokenize(stringToTokenize = '') {
  // TODO: loop through tokenTypes and find matching pairs, then wrap text in HTML tags
  function indexOrEnd(str, char) {
    const index = str.indexOf(char)
    return index === -1 ? str.length : index
  }

  function takeNormal(text) {
    const end = Object.keys(tokenTypes)
      .map(token => indexOrEnd(text, token))
      .reduce((sum, index) => Math.min(sum, index), text.length)
    return text.slice(0, end)
  }

  function takeUpTo(text, char) {
    const end = text.indexOf(char, 1)
    if (end === -1) {
      return new Token('TEXT', `${char}${takeNormal(text.substr(1))}`)
    }
    return new Token(tokenTypes[char], text.slice(1, end))
  }

  const char = stringToTokenize.charAt(0)
  const token = tokenTypes[char]
    ? takeUpTo(stringToTokenize, char)
    : new Token('TEXT', takeNormal(stringToTokenize))
  const remainingString =
    token.type === 'TEXT'
      ? stringToTokenize.substr(token.content.length)
      : stringToTokenize.substr(token.content.length + 2)

  return remainingString.length
    ? [token, ...tokenize(remainingString)]
    : [token]
}

export function parser(tokenArray) {
  return tokenArray.reduce((parsed, token) => {
    let parsedString
    switch (token.type) {
      case 'ITALIC':
        parsedString = `<em>_${token.content}_</em>`
        break
      case 'BOLD':
        parsedString = `<strong>*${token.content}*</strong>`
        break
      case 'MATH':
        parsedString = `<span class="math">$${katex.renderToString(
          token.content
        )}$</span>`
        break
      case 'CARET':
        parsedString = `<span id="caret-position"></span>`
        break
      default:
        parsedString = token.content
    }
    return `${parsed}${parsedString}`
  }, '')
}

export default function markdownToHTML(str = '') {
  return `<p class="card-size">${parser(tokenize(str))}</p>`
}
