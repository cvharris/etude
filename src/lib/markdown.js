import MarkdownIt from 'markdown-it'

export const md = new MarkdownIt()

// const md = new MarkdownIt('commonmark', {
//   breaks: true,
//   linkify: true,
//   html: false
// });

// md.configure({
//   components: {
//     core: {
//       rules: [
//         'block',
//         'inline',
//         // 'references',
//         // 'replacements',
//         'linkify',
//         // 'smartquotes',
//         // 'abbr2',
//         // 'footnote_tail'
//       ]
//     },
//     block: {
//       rules: [
//         // 'blockquote',
//         // 'code',
//         // 'fences',
//         // 'heading',
//         // 'hr',
//         'htmlblock',
//         // 'lheading',
//         // 'list',
//         'paragraph',
//         // 'table'
//       ]
//     },
//     inline: {
//       rules: [
//         // 'autolink',
//         // 'backticks',
//         // 'del',
//         'emphasis',
//         // 'entity',
//         // 'escape',
//         // 'footnote_ref',
//         // 'htmltag',
//         'links',
//         'newline',
//         // 'text'
//       ]
//     }
//   }
// });
