const Lexer = require('../utils/lexer');
const { TYPES, SYMBOLS, SPECIAL } = require('../utils/enums');

test('map empty string', () => {
	const input = '';
	const l = new Lexer(input);
	const tokenList = l.mapper();

	expect(tokenList.length === 1);
	expect(tokenList[0].type === SPECIAL.EOF);
});

test('map chars', () => {
	const input = 'helloWorld';
	const l = new Lexer(input);
	const tokenList = l.mapper();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			expect(t.type === TYPES.CHAR);
			return t.value;
		}
	});

	expect(input === result);
});

test('map ints', () => {
	const input = '1234567890';
	const l = new Lexer(input);
	const tokenList = l.mapper();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			expect(t.type === TYPES.INT);
			return t.value;
		}
	});

	expect(input === result);
});

test('map symbols', () => {
	const input = '+-*/=(){}[]\'"`~';
	const l = new Lexer(input);
	const tokenList = l.mapper();

	expect(tokenList[tokenList.length - 1].type === SPECIAL.EOF);

	const result = tokenList.map((t) => {
		if (t.type !== SPECIAL.EOF) {
			return t.type;
		}
	});

	for (s in SYMBOLS) expect(result.includes(s));
});
