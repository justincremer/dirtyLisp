const Lexer = require('./lexer');
const { TYPES, SYMBOLS, SPECIAL } = require('../shared/enums');

class Parser {
	constructor(text) {
		this.text = text;
		this.lexer = new Lexer(text);
		this.lexMap = this.lexer._repr();
		this.len = this.lexMap.length;
		this.pos = 0;
	}

	_text = () => this.text;
}

module.exports = Parser;
