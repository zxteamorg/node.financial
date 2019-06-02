import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup } from "../../src/index";

const financial = setup({
	backend: "string",
	decimalSeparator: ".",
	defaultRoundOpts: {
		fractionalDigits: 10,
		roundMode: zxteam.Financial.RoundMode.Round
	}
});

type TestCases = Array<[string, zxteam.Financial]>;

const testCases: TestCases = [
	["0.000999", { sign: "+", whole: "0", fractional: "000999" }],
	["-0.5", { sign: "-", whole: "0", fractional: "5" }],
	["1001", { sign: "+", whole: "1001", fractional: "0" }],
	["10010", { sign: "+", whole: "10010", fractional: "0" }],
	["-999", { sign: "-", whole: "999", fractional: "0" }],
	//["1001.1010000", { sign: "+", whole: "1001", fractional: "1010000" }],
	["43759834597395873954873548.123456789", { sign: "+", whole: "43759834597395873954873548", fractional: "123456789" }]
	//["43759834597395873954873548.123456789000", { sign: "+", whole: "43759834597395873954873548", fractional: "123456789000" }],
	//["-43759834597395873954873548.489000", { sign: "-", whole: "43759834597395873954873548", fractional: "489000" }]
];
describe("parse", function () {
	testCases.forEach(testCase => {
		const [input, expectedResult] = testCase;
		it(
			`Should parse string value "${input}" to ${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.parse(input);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			}
		);
	});
});
