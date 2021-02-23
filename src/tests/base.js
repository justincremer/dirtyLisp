const Lexer = require('../utils/lexer');

class BaseTest {
	// addition = () => {
	// 	this.current = this.step();

	// 	const left = this.current;
	// 	this.mergeTokens(TYPES.INT);

	// 	const op = this.current;
	// 	this.mergeTokens(SYMBOLS.PLUS);

	// 	const right = this.current;
	// 	this.mergeTokens(TYPES.INT);

	// 	const result = parseInt(left.value) + parseInt(right.value);
	// 	return result;
	// };

	parse = () => {
		const lexer = new Lexer('hello world');
		console.log(lexer.parse());
	};
}
module.exports = BaseTest;
