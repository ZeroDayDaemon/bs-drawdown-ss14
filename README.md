# bs-drawdown

Tiny Markdown to HTML conversion in JavaScript, optionally Bootstrap styled.

Supported Markdown features:

#### Headings

Inline styles such as **bold**, *italic*, ***both***, ~~strikethrough~~, `monospace`, --subscript--, and ^^superscript^^.

> Block quotes, including
> > nested block quotes.

```
Fenced code blocks
```

    Indented code blocks

1. Numbered lists
  - Unordered lists
  - Nested in other lists
    a. Lettered lists are an extension to the spec.
    b. They may be useful for legal documents.
2. Another entry in my numbered list.

| Tables | Tables | Tables |
| ------ | ------ | ------ |
| Cell 1 | Cell 2 | Cell 3 |
| Cell 4 | Cell 5 | Cell 6 |
| Cell 7 | Cell 8 | Cell 9 |

[Links](https://github.com/JulienChebance/bs-drawdown)

Fuzzy links:  
https://odt.space.  
www.odt.space  
`http://disabled.link.com`

Variable links:  
[Wikipedia] is a free online encyclopedia, created and edited by volunteers around the world and hosted by the [Wikimedia Foundation].
[wikipedia]: https://www.wikipedia.org
[wikimedia foundation]: https://wikimediafoundation.org

Images:

![Images](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

---

### Summary...

These are the supported features:

- Block quotes
- Code blocks
- Links
- Images
- Headings
- Lists (including lettered lists)
- Bold
- Italic
- Strikethrough
- Monospace
- Subscript
- Horizontal rule
- Tables
- Link variables

Unsupported Markdown features at this time:

- Line blocks
- Definition lists
- Footnotes
- Twitter/Facebook/YouTube embed
- Inline math equations

##### Usage

    import markdown from './bs-drawdown.js'
    element.innerHTML = markdown(text)

##### License

[MIT](LICENSE)