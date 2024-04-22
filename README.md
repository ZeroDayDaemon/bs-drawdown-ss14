# drawdown-ss14


Tiny Markdown to HTML conversion in JavaScript, optionally Bootstrap styled, compatible with Space Station 14 Markdown.
drawdown-ss14 is intended to be used to directly take the rules.txt from a Github repository and display it on a webpage.

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

[Links](https://github.com/ZeroDayDaemon/drawdown-ss14)

Fuzzy links:  
https://example.com.  
www.example.com
`http://disabled.example.com`

Variable links:  
[Wikipedia] is a free online encyclopedia, created and edited by volunteers around the world and hosted by the [Wikimedia Foundation].
[wikipedia]: https://www.wikipedia.org
[wikimedia foundation]: https://wikimediafoundation.org

Images:

![Images](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

---

Color Tags:

Color tags following the Space Station 14 Markdown are available.

[color=#ff0000]Red[/color] and [color=#00ff00]Green[/color] and [color=#0000ff]Blue[/color]

[color=#5BCEFA]█[/color][color=#F5A9B8]█[/color][color=#FFFFFF]█[/color][color=#F5A9B8]█[/color][color=#5BCEFA]█[/color]
they support all hexadecimal colors.

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
- Color tags

Unsupported Markdown features at this time:

- Line blocks
- Definition lists
- Footnotes
- Twitter/Facebook/YouTube embed
- Inline math equations

##### Usage

    import markdown from './drawdown-ss14.js'
    element.innerHTML = markdown(text)

##### License

[MIT](https://github.com/ZeroDayDaemon/drawdown-ss14/blob/master/LICENSE)
