const { TYPES, SYMBOLS, SPECIAL } = require('../shared/enums');

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

	errorHandler = (t) => {
		const message = `error parsing: ${t._repr()}`;
		console.error(message);
	};

	// return token from a character
	createToken = (c) =>
		c.match(/[0-9]/) !== null
			? new Token(TYPES.NUMBER, c)
			: c.match(/[a-z]/i) !== null
			? new Token(TYPES.CHARACTER, c)
			: c === '+'
			? new Token(SYMBOLS.PLUS, c)
			: c === '-'
			? new Token(SYMBOLS.MINUS, c)
			: c === '*'
			? new Token(SYMBOLS.MULTIPLY, c)
			: c === '/'
			? new Token(SYMBOLS.DIVIDE, c)
			: c === '='
			? new Token(SYMBOLS.EQUALS, c)
			: c === '('
			? new Token(SYMBOLS.LPAREN, c)
			: c === ')'
			? new Token(SYMBOLS.RPAREN, c)
			: c === '{'
			? new Token(SYMBOLS.LBRACKET, c)
			: c === '}'
			? new Token(SYMBOLS.RBRACKET, c)
			: c === '['
			? new Token(SYMBOLS.LSQBRACKET, c)
			: c === ']'
			? new Token(SYMBOLS.RSQBRACKET, c)
			: c === "'"
			? new Token(SYMBOLS.SQUOTE, c)
			: c === '"'
			? new Token(SYMBOLS.DQUOTE, c)
			: c === '`'
			? new Token(SYMBOLS.BACKTICK, c)
			: c === '~'
			? new Token(SYMBOLS.TILDE, c)
			: c === '\n'
			? new Token(SPECIAL.NEWLINE, c)
			: c === '\t'
			? new Token(SPECIAL.TAB, c)
			: c === ' '
			? new Token(SPECIAL.WHITESPACE, c)
			: new Token(TYPES.UNDEFINED, c);

	// Steps through this.text and Tokenizes the current character,
	// handling various data and symbol types and checking for syntax errors
	stepHandler = () => {
		if (this.pos > this.text.length - 1) {
			return new Token(SPECIAL.EOF, null);
		}

		const token = this.createToken(this.text[this.pos]);
		if (token.type === TYPES.UNDEFINED) {
			this.errorHandler(token);
		} else {
			this.pos++;
			return token;
		}
	};

	// Checks if tokens are mergable and does so if they are
	// e.g. [{NUMBER, 1}, {NUMBER, 2}] == {NUMBER, 12}
	mergeHandler = (t1, t2) => new Token(t1.type, t1.value + t2.value);

	// Lexically maps and merges tokens, returning a 1D array of tokens
	mapper = () => {
		try {
			// TODO: rewrite this mess
			let result = [];

			this.current = this.stepHandler();
			result.push(this.current);
			if (this.text.length === 0) return result;

			do {
				this.previous = this.current;
				this.current = this.stepHandler();

				if (this.current.type === this.previous.type) {
					this.current = this.mergeHandler(
						this.previous,
						this.current
					);
					result.pop();
					result.push(this.current);
				} else {
					result.push(this.current);
				}
			} while (this.current.type !== SPECIAL.EOF);

			return result;
		} catch (e) {
			throw new Error(e);
		}
	};

	// Object representation
	_repr = () => this.mapper();

	// String representation
	_str = () => JSON.stringify(this._repr());

	// Probably going to rip this out and implement a generator in the parser
	// _itr = () => {
	// 	const phrase = new Set(this._repr());

	// 	for (const t of phrase) return t;
	// };
}

module.exports = Lexer;
