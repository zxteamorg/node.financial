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

type TestCases = Array<[zxteam.Financial, zxteam.Financial, zxteam.Financial]>;

const testCases: TestCases = [
	[{ sign: "+", whole: "5", fractional: "0" }, { sign: "+", whole: "5", fractional: "0" }, { sign: "+", whole: "10", fractional: "0" }],
	[{ sign: "-", whole: "5", fractional: "0" }, { sign: "+", whole: "5", fractional: "0" }, { sign: null, whole: "0", fractional: "0" }],
	[{ sign: "+", whole: "0", fractional: "1" }, { sign: "+", whole: "0", fractional: "2" }, { sign: "+", whole: "0", fractional: "3" }],
	[{ sign: "+", whole: "0", fractional: "0" }, { sign: "+", whole: "0", fractional: "2" }, { sign: "+", whole: "0", fractional: "2" }],
	// tslint:disable-next-line:max-line-length
	[{ sign: "+", whole: "123", fractional: "54627856" }, { sign: "+", whole: "2", fractional: "12648543" }, { sign: "+", whole: "125", fractional: "67276399" }],
	// tslint:disable-next-line:max-line-length
	[{ sign: "+", whole: "354793854793875498379548374958", fractional: "0" }, { sign: "+", whole: "3485739854", fractional: "0" }, { sign: "+", whole: "354793854793875498383034114812", fractional: "0" }],
	// tslint:disable-next-line:max-line-length
	[{ sign: "+", whole: "35479385479387549837954837", fractional: "495835" }, { sign: "+", whole: "13", fractional: "485739" }, { sign: "+", whole: "35479385479387549837954850", fractional: "981574" }]
];

describe("Financial funtion add", function () {
	testCases.forEach(testCase => {
		const [left, right, expectedResult] = testCase;
		it(
			`Should be ${JSON.stringify(left)} + ${JSON.stringify(right)} = ${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.add(left, right);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			});
	});
});
