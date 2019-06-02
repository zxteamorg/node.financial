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
	[
		{ sign: "+", whole: "34598273429834723449854345", fractional: "22" },
		{ sign: "+", whole: "234", fractional: "34" },
		{ sign: "+", whole: "8107759395547469093238867258", fractional: "8548" }
	],
	[
		{ sign: "-", whole: "3547938547983954", fractional: "73548395" },
		{ sign: "+", whole: "456", fractional: "23" },
		{ sign: "-", whole: "1618676003746719668", fractional: "9698425085" }
	]
	// [{ value: "123456789012345123456789012345", fraction: 15 }, { value: "-2", fraction: 0 }, ["-246913578024690246913578024690", 15]],
	// [{ value: "-354793854798395473548395", fraction: 8 }, { value: "0", fraction: 0 }, ["0", 0]],
	// [{ value: "42", fraction: 0 }, { value: "-1", fraction: 0 }, ["-42", 0]],
	// [{ value: "42", fraction: 0 }, { value: "-2", fraction: 0 }, ["-84", 0]],
	// [{ value: "-42", fraction: 0 }, { value: "-2", fraction: 0 }, ["84", 0]],
	// [{ value: "4212345678", fraction: 8 }, { value: "-1", fraction: 0 }, ["-4212345678", 8]]
];

describe("multiply", function () {
	testCases.forEach(testCase => {
		const [left, right, expectedResult] = testCase;
		it(
			`Should be ${JSON.stringify(left)} * ${JSON.stringify(right)} = ${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.multiply(left, right);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			});
	});
});
