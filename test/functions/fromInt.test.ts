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

type TestCases = Array<[number, zxteam.Financial]>;

const testCases: TestCases = [
	[999, { sign: "+", whole: "999", fractional: "0" }],
	[10010, { sign: "+", whole: "10010", fractional: "0" }],
	[-12310010, { sign: "-", whole: "12310010", fractional: "0" }]
];

describe("fromInt", function () {
	testCases.forEach(testCase => {
		const [inputValue, expectedResult] = testCase;
		it(
			`Should create by v:${inputValue} to ${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.fromInt(inputValue);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			}
		);
	});
});
