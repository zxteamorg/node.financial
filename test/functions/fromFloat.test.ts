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

type TestCases = Array<[[number, number], zxteam.Financial]>;

const testCases: TestCases = [
	[[0.000999, 6], { sign: "+", whole: "0", fractional: "000999" }],
	[[0.00000001, 8], { sign: "+", whole: "0", fractional: "00000001" }],
	[[-0.5, 1], { sign: "-", whole: "0", fractional: "5" }],
	[[1001, 0], { sign: "+", whole: "1001", fractional: "0" }],
	[[10010, 0], { sign: "+", whole: "10010", fractional: "0" }],
	[[-999, 0], { sign: "-", whole: "999", fractional: "0" }],
	[[1001.101, 3], { sign: "+", whole: "1001", fractional: "101" }]
];

describe("Financial funtion fromFloat", function () {
	testCases.forEach(fromFloatCase => {
		const [input, expectedResult] = fromFloatCase;
		const [inputValue, inputFraction] = input;
		it(
			`Should create by v:${inputValue} and f:${inputFraction} to "${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.fromFloat(inputValue, inputFraction);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			}
		);
	});
});
