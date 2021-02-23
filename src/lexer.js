// TYPES
const INT = 'INT';
const FLOAT = 'FLOAT';
const CHAR = 'CHAR';
const UNDEFINED = 'UNDEFINED';
// SYMBOLS
const PLUS = 'PLUS';
const MINUS = 'MINUS';
const MULTIPLY = 'MULTIPLY';
const DIVIDE = 'DIVIDE';
// SPECIAL
const FILE_END = 'EOF';
const NEW_LINE = 'NL';
const SPACE = 'SPACE';
const TAB = 'TAB';

class Token {
	/**
	 * An object representation of a tokenized character
	 * type: the data or symbol type definition
	 * value: the character, stored as a char;
	 */
	constructor(type, value) {
		this.type = type;
		this.value = value;
	}

	// Returns a string representation of the instance
	_repr = () => `Token : { ${this.type}, ${this.value} }`;
}

class Lexer {
	/**
	 * Builds a one dimensional map of tokens
	 * text: a string representation of our input code
	 * pos: our current index in this.text
	 * current: the current character at this.text[pos]
	 */
	constructor(text) {
		this.text = text;
		this.pos = 0;
		this.current = null;
	}

	// We all know what this does
	error = (c) => {
		const errorToken = new Token(UNDEFINED, c);
		const message = `error parsing: ${errorToken._repr()}`;
		console.log(message);
	};

	// Steps through this.text and Tokenizes the current character,
	// handling various data and symbol types and checking for syntax errors
	advance = () => {
		if (this.pos > this.text.length - 1) {
			return new Token(FILE_END, null);
		}

		const current = this.text[this.pos];

		if (current >= 0 && current <= 9) {
			this.pos++;
			return new Token(INT, parseInt(current));
		} else if (current === '+') {
			this.pos++;
			return new Token(PLUS, current);
		}

		this.error(current);
	};

	// Merges adjacent characters if they are valid and of the same data type
	// e.g. [{INT, 1}, {INT, 2}] == {INT, 12}
	merge = (type) =>
		this.current.type === type
			? (this.current = this.advance())
			: this.error(this.current);

	calculate = () => {
		this.current = this.advance();

		const left = this.current;
		this.merge(INT);

		const op = this.current;
		this.merge(PLUS);

		const right = this.current;
		this.merge(INT);

		const result = left.value + right.value;
		return result;
	};
}

module.exports = Lexer;
