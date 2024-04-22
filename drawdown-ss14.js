/**
 * drawdown-ss14.js
 * (c) 2023 ZeroDayDaemon
 *
 * Fork of bs-drawdown.js
 * (c) 2022 Julien Chebance
 *
 * Which itself is a fork of drawdown.js
 * (c) 2016 Adam Leggett
 *
 * Fuzzy links from Max van der Schee (aka mvdschee) fork
 */

 const bootstrapClasses = {
	blockquote: 'border-start border-3 ps-4 py-2 mt-3',
	h1: 'pb-2 border-bottom border-dark border-opacity-25',
	pre: 'bg-light py-1 px-3 fs-6',
	table: 'table',
}

export default function(src, customClasses = {}, bootstrapStyled = getComputedStyle(document.documentElement).getPropertyValue('--bs-primary') != '') {
	const rx = {
		lt: /</g,	
		gt: />/g,
		CR: /\r(?=\n)/g,
		space: /\t|\uf8ff/g,
		escape: /\\([\\\|`*_{}\[\]()#+\-~])/g,
		hr: /^([*\-=_] *){3,}$/gm,
		blockquote: /\n *&gt; *([^]*?)(?=(\n|$){2})/g,
		list: /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,
		listjoin: /<\/(ol|ul)>\n\n<\1>/g,
		highlight: /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,
		code: /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g,
		link_variable: /\[([^\]]+?)\](?![:\(])/g,
		link: /((!?)\[([^\]]+?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g,
		fuzzy_link: /(?<!`)((https?:\/\/\S+)|(www\.\S+\.\S+))(?!`)\b/g,
		table: /\n(( *\|.*?\| *\n)+)/g,
		thead: /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,
		row: /.*\n/g,
		cell: /\||(.*?[^\\])\|/g,
		heading: /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g,
		paragraph: /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g,
		line_break: /  $/gm,
		stash: /-\d+\uf8ff/g,
		color: /(\[color=(#[0-9a-fA-F]{6})\])([\s\S]*?)(\[\/color\])/g,
	}

	const classes = (tag) => ((customClasses[tag] || '') + ' ' + (bootstrapStyled?bootstrapClasses[tag] || '':'')).trim() || undefined
	const element = (tag, content, attributes = {}) => `<${tag} ${Object.entries(Object.assign(attributes, {class: classes(tag)})).map(([key, value]) => value?`${key}="${value}"`:'').join(' ')}>${content}</${tag}>`

	const blockquote = (src) => src.replace(rx.blockquote, (all, content) => element('blockquote', blockquote(highlight(content.replace(/^ *&gt; */gm, '')))))

	const list = (src) => src.replace(rx.list, (all, ind, ol, num, low, content) => '\n' + element(
		ol?'ol':'ul',
		element('li', highlight(content.split(new RegExp('\n ?' + ind + '(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +', 'g')).map(list).join('</li><li>'))),
		ol?{start: num?ol:parseInt(ol, 36) - 9, style: num?'':`list-style-type: ${low?'lower-alpha':'upper-alpha'}`}:{})
	)

	const highlight = (src) => src.replace(rx.highlight, (all, _, p1, emp, sub, sup, small, big, p2, content) => _ + element(
			emp ? (p2 ? 'strong' : 'em')
		: sub ? (p2 ? 's' : 'sub')
		: sup ? 'sup'
		: small ? 'small'
		: big ? 'big'
		: 'code',
		highlight(content))
	)

	const unesc = (str) => str.replace(rx.escape, '$1')

	let stash = [], si = 0

	src = `\n${src}\n`.replace(rx.lt, '&lt;').replace(rx.gt, '&gt;').replace(rx.CR, '').replace(rx.space, '  ')

	// blockquote
	src = blockquote(src);

	// horizontal rule
	src = src.replace(rx.hr, '<hr/>');

	// list
	src = list(src).replace(rx.listjoin, '');

	// code
	src = src.replace(rx.code, (all, p1, p2, p3, p4) => {
		stash[--si] = element('pre', element('code', p3 || p4.replace(/^    /gm, '')))
		return si + '\uf8ff'
	})

	// link variable
	src = src.replace(rx.link_variable, (all, p1) => {
		const v = src.match(new RegExp('^\\[' + p1 + '\\]:\\s(\\S+)$', 'mi'))
		return v?`${all}(${v[1]})`:all
	})
	src = src.replace(/^\[[^\]]+\]:\s(\S+)$/gm, '') // Delete variables once processed

	// link or image
	src = src.replace(rx.link, (all, p1, p2, p3, p4, p5, p6) => {
		stash[--si] = p4
			? p2
				? `<img src="${p4}" alt="${p3}"/>`
				: element('a', unesc(highlight(p3)), {href: p4, target: new URL(p4).host != location.host?'_blank':undefined})
			: p6;
		return si + '\uf8ff'
	})

	// fuzzy link
	src = src.replace(rx.fuzzy_link, (all, p1, p2, p3) => {
		stash[--si] = element('a', unesc(highlight(p2 || p3)), {href: p2?p2:`https://${p3}`, target: new URL(p2?p2:`https://${p3}`).host != location.host?'_blank':undefined})
		return si + '\uf8ff';
	})

	// color tag
	src = src.replace(rx.color, (all, p1, p2, p3, p4) => {
		stash[--si] = element('span', unesc(highlight(p3)), {style: 'color:' + p2})
		return si + '\uf8ff';
	})

	// table
	src = src.replace(rx.table, (all, table) => {
		const sep = table.match(rx.thead)[1]
		return '\n' + element('table',
			table.replace(rx.row, (row, ri) => {
				return row == sep ? '' : element('tr', row.replace(rx.cell, (all, cell, ci) => {
					return ci ? element(sep && !ri ? 'th' : 'td', unesc(highlight(cell || ''))) : ''
				}))
			})
		)
	})

	// heading
	src = src.replace(rx.heading, (all, _, p1, p2) => _ + element('h' + p1.length, unesc(highlight(p2))))

	// paragraph
	src = src.replace(rx.paragraph, (all, content) => element('p', unesc(highlight(content))))

	// line break
	src = src.replace(rx.line_break, (all) => '<br/>');

	// stash
	src = src.replace(rx.stash, (all) => stash[parseInt(all)])

	return src.trim()
}