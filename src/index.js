const prompt = require('prompt-sync')();
const Lexer = require('./utils/lexer');

while (1) {
	const text = prompt('DL => ');

	if (text.toLowerCase === 'exit') {
		break;
	} else {
		const l = new Lexer(text);

		result = l.parse(text);
		console.log(result);
	}
}

// while (1) {
// 	const text = prompt('calc => ');

// 	if (text.toLowerCase === 'exit') {
// 		break;
// 	} else {
// 		lexer = new Lexer(text);

// 		result = lexer.additionTest();
// 		console.log(result);
// 	}
// }
