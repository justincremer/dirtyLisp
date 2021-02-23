const Lexer = require('../utils/lexer');
const { TYPES, SYMBOLS, SPECIAL } = require('../utils/enums');

test('parse empty string', () => {
	const input = '';
	const l = new Lexer(input);
	const tokenList = l.parse();

	expect(tokenList.length === 1);
	expect(tokenList[0].type === SPECIAL.EOF);
});

test('parse chars', () => {
	const input = 'helloWorld';
	const l = new Lexer(input);
	const tokenList = l.parse();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			expect(t.type === TYPES.CHAR);
			return t.value;
		}
	});

	expect(input === result);
});

test('parse ints', () => {
	const input = '1234567890';
	const l = new Lexer(input);
	const tokenList = l.parse();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			expect(t.type === TYPES.INT);
			return t.value;
		}
	});

	expect(input === result);
});

test('parse symbols', () => {
	const input = '+-*/()';
	const l = new Lexer(input);
	const tokenList = l.parse();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			return t.type;
		}
	});

	for (s in SYMBOLS) expect(result.includes(s));
});
