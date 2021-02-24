const prompt = require('prompt-sync')();
const Parser = require('./utils/parser');
const help = require('./shared/help');
const { TYPES, SPECIAL } = require('./shared/enums');

// This is sloppy, but it's only an example repl
const streamHandler = (pt) => {
	const lm = pt.lexMap;

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

			if (t.value === 'clear') {
				commandFlag = true;
				console.clear();
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
