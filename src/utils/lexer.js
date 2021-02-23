const { TYPES, SYMBOLS, SPECIAL } = require('./enums');

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
	_str = () => `Token : { ${this.type}, ${this.value} }`;
	_repr = () => JSON.parse(this._str);
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
		this.previous = null;
	}

	error = (t) => {
		const message = `error parsing: ${t._repr()}`;
		console.log(message);
	};

	// return token from a character
	createToken = (c) =>
		c.match(/[0-9]/) !== null
			? new Token(TYPES.INT, c)
			: c.match(/[a-z]/i) !== null
			? new Token(TYPES.CHAR, c)
			: c === '+'
			? new Token(SYMBOLS.PLUS, c)
			: c === '-'
			? new Token(SYMBOLS.MINUS, c)
			: c === '*'
			? new Token(SYMBOLS.MULTIPLY, c)
			: c === '/'
			? new Token(SYMBOLS.DIVIDE, c)
			: c === '\n'
			? new Token(SPECIAL.NEWLINE, c)
			: c === '\t'
			? new Token(SPECIAL.TAB, c)
			: c === ' '
			? new Token(SPECIAL.SPACE, c)
			: new Token(TYPES.UNDEFINED, c);

	// Steps through this.text and Tokenizes the current character,
	// handling various data and symbol types and checking for syntax errors
	stepHandler = () => {
		if (this.pos > this.text.length - 1) {
			return new Token(SPECIAL.EOF, null);
		}

		const token = this.createToken(this.text[this.pos]);
		if (token.type === TYPES.UNDEFINED) {
			this.error(token);
		} else {
			this.pos++;
			return token;
		}
	};

	// Checks if tokens are mergable and does so if they are
	// e.g. [{INT, 1}, {INT, 2}] == {INT, 12}
	mergeHandler = (t1, t2) => {
		const allowed = [TYPES.INT, TYPES.CHAR];
		if (
			this.current.type ===
			this.previous.type(t1.type === TYPES.INT || t1.type === TYPES.CHAR)
		) {
			return new Token(t1.type, t1 + t2);
		} else {
			this.error(this.current);
		}
	};

	parse = () => {
		try {
			let result = [];

			this.current = this.stepHandler();
			result.push(this.current);

			do {
				// this.previous = this.current;
				// this.current = this.stepHandler();
				// if (this.current.type === this.previous.type) {
				// 	this.current = this.mergeHandler(
				// 		this.current,
				// 		this.previous
				// 	);
				// 	result.pop();
				// 	result.push(this.current);
				// } else {
				this.current = this.stepHandler();
				result.push(this.current);
				// }
			} while (this.current.type !== SPECIAL.EOF);

			return result;
		} catch (e) {
			throw new Error(e);
		}
	};
}

module.exports = Lexer;
