// TYPES
const INT = 'INT';
const FLOAT = 'FLOAT';
const CHAR = 'CHAR';
const UNDEFINED = 'UNDEFINED';
const NULL = 'NULL';

// SYMBOLS
const PLUS = 'PLUS';
const MINUS = 'MINUS';
const MULTIPLY = 'MULTIPLY';
const DIVIDE = 'DIVIDE';

// SPECIAL
const EOF = 'EOF';
const WHITESPACE = 'WS';
const TAB = 'TAB';
const NEWLINE = 'NL';

module.exports = {
	TYPES: { INT, FLOAT, CHAR, UNDEFINED, NULL },
	SYMBOLS: { PLUS, MINUS, MULTIPLY, DIVIDE },
	SPECIAL: { EOF, WHITESPACE, TAB, NEWLINE },
};
