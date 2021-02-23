// TYPES
const TYPES = {
	INT: 'INT', // 123
	FLOAT: 'FLOAT', // 1.23
	CHAR: 'CHAR', // a b c
	UNDEFINED: 'UNDEFINED', // undefined
	NULL: 'NULL', // null
};

// SYMBOLS;
const SYMBOLS = {
	PLUS: 'PLUS', // +
	MINUS: 'MINUS', // -
	MULTIPLY: 'MULTIPLY', // *
	DIVIDE: 'DIVIDE', // /
	EQUALS: 'EQUALS', // =
	LPAREN: 'LPAREN', // (
	RPAREN: 'RPAREN', // )
	LBRACKET: 'LBRACKET', // {
	RBRACKET: 'RBRACKET', // }
	LSQBRACKET: 'LSQBRACKET', // [
	RSQBRACKET: 'RSQBRACKET', // ]
	SQUOTE: 'SQUOTE', // '
	DQUOTE: 'DQUOTE', // "
	BACKTICK: 'BACKTICK', // `
	TILDE: 'TILDE', // ~
};

// SPECIAL
const SPECIAL = {
	EOF: 'EOF',
	WHITESPACE: 'WS',
	TAB: 'TAB',
	NEWLINE: 'NL',
};

module.exports = { TYPES, SYMBOLS, SPECIAL };
