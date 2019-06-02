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

type TestCases = Array<[zxteam.Financial, zxteam.Financial, boolean]>;

const testCases: TestCases = [
	[{ sign: "+", whole: "5", fractional: "0" }, { sign: "+", whole: "5", fractional: "0" }, true],
	[{ sign: "-", whole: "5", fractional: "0" }, { sign: "+", whole: "5", fractional: "0" }, false]
	// [{ value: "1", fraction: 1 }, { value: "2", fraction: 1 }, false],
	// [{ value: "0", fraction: 0 }, { value: "2", fraction: 1 }, false],
	// [{ value: "12354627856", fraction: 8 }, { value: "212648543", fraction: 8 }, false],
	// [{ value: "354793854793875498379548374958", fraction: 0 }, { value: "3485739854", fraction: 0 }, false],
	// // tslint:disable-next-line:max-line-length
	// [{ value: "35479385479387549837954837495835", fraction: 6 }, { value: "35479385479387549837954837495835", fraction: 6 }, true],
	// [{ value: "-35479385479387549837954837495835", fraction: 8 }, { value: "-35479385479387549837954837495835", fraction: 8 }, true],
	// [{ value: "-35479385479387549837954837495835", fraction: 8 }, { value: "-35479385479387549837954837495835", fraction: 10 }, false],
	// [{ value: "35479385479387549837954837495835", fraction: 8 }, { value: "35479385479387549837954837495835", fraction: 15 }, false],
	// [{ value: "35479385479387549837954837495835", fraction: 10 }, { value: "-35479385479387549837954837495835", fraction: 10 }, false]
];

describe("Financial funtion equals", function () {
	testCases.forEach(testCase => {
		const [left, right, expectedBoolean] = testCase;
		it(
			// tslint:disable-next-line: max-line-length
			`Should be ${JSON.stringify(left)} === ${JSON.stringify(right)} = is ${expectedBoolean}`,
			function () {
				const result = financial.equals(left, right);
				assert.equal(result, expectedBoolean);
			});
	});
});
