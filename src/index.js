const prompt = require('prompt-sync')();
const Lexer = require('./lexer');

while (1) {
	const text = prompt('calc => ');

	if (text.toLowerCase === 'exit') {
		break;
	} else {
		lexer = new Lexer(text);

		result = lexer.calculate();
		console.log(result);
	}
}
