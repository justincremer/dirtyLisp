const prompt = require('prompt-sync')();
const Parser = require('./utils/parser');
const help = require('./shared/help');
const { TYPES, SPECIAL } = require('./shared/enums');

// This is sloppy, but it's temporary and only here as an example repl
const streamHandler = (pt) => {
	const lm = pt.lexMap;

	// TODO: create command object (maybe 'dt' or 'dl')
	// in order to avoid abitrary string conflicts. e.g. 'dt.exit'

	// ONE
	// if (pt.len === 2 && lm[0].type === TYPES.CHARACTER) {
	// 	lm.map((t) => {
	// 		switch (t.value) {
	// 			case 'exit' || 'quit':
	// 				console.log('safely exiting...');
	// 				process.exit(0);
	// 			case 'help' || 'h':
	// 				console.log(`\n${help}\n`);
	// 				break;
	// 			default:
	// 				console.log(`${t.value} is not a valid command`);
	// 				break;
	// 		}
	// 	});
	// } else {
	// 	console.log(lm);
	// }

	// TWO
	let commandFlag;
	lm.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			if (t.value === 'exit' || t.value === 'quit') {
				console.log('safely exiting...');
				process.exit(0);
			}

			if (t.value === 'help') {
				commandFlag = true;
				console.log(`\n${help}\n`);
			}
		}
	});

	if (!commandFlag) {
		console.log(lm);
	}
};

while (1) {
	// Takes input stream
	const text = prompt('DL => ');

	// Parses input text
	const parsedText = new Parser(text);

	// Checks and handles console commands
	streamHandler(parsedText);
}
