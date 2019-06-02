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
		{ sign: "-", whole: "1331234", fractional: "3000100011" },
		{ sign: "+", whole: "21", fractional: "01" },
		{ sign: "-", whole: "63361", fractional: "9371732508" }
	],
	[
		{ sign: "+", whole: "1331234", fractional: "3000100011" },
		{ sign: "-", whole: "21", fractional: "01" },
		{ sign: "-", whole: "63361", fractional: "9371732508" }
	]
	// [{ value: "13312343000100011", fraction: 10 }, { value: "2101", fraction: 2 }, ["633619371732508", 10]],
	// [{ value: "1333000100011", fraction: 9 }, { value: "21000001", fraction: 6 }, ["63476192215", 9]],
	// [{ value: "133300010001", fraction: 8 }, { value: "21000001", fraction: 6 }, ["6347619221", 8]],
	// [{ value: "13330001", fraction: 4 }, { value: "21000001", fraction: 6 }, ["6347619221", 8]],
	// [{ value: "1555000111", fraction: 6 }, { value: "3120301001", fraction: 8 }, ["4983493933", 8]],
	// [{ value: "15550001", fraction: 4 }, { value: "31203001", fraction: 6 }, ["4983495337", 8]],
	// [{ value: "155501", fraction: 2 }, { value: "31203001", fraction: 6 }, ["4983527065", 8]],
	// // Test-case from CoinGet: 24.2644184325 BTC need to divive to BCN price 0.00000017 should be equal 142731873.1323529482 BCN
	// [{ value: "242644184325", fraction: 10 }, { value: "17", fraction: 8 }, ["1427318731323529482", 10]],
	// [{ value: "13335", fraction: 1 }, { value: "21000001", fraction: 6 }, ["6349999697", 8]],
	// [{ value: "1333", fraction: 0 }, { value: "21000001", fraction: 6 }, ["6347618745", 8]],
	// [{ value: "32423423423423423456", fraction: 8 }, { value: "23434", fraction: 2 }, ["138360601789807217", 8]],
	// [{ value: "1333", fraction: 0 }, { value: "21", fraction: 0 }, ["6347619047", 8]],
	// [{ value: "123456789012345123456789012345", fraction: 0 }, { value: "212345678", fraction: 0 }, ["58139534637641705830616911517", 8]],
	// // Test-case from CoinGet: 0 BTC need to divide to BCN price 0.00000017 should be equal 0.0
	// [{ value: "0", fraction: 0 }, { value: "17", fraction: 8 }, ["0", 0]],
	// [{ value: "11230707245", fraction: 9 }, { value: "1", fraction: 0 }, ["11230707245", 9]],
	// [{ value: "1333", fraction: 0 }, { value: "210001", fraction: 4 }, ["6347588821", 8]]
];

describe("Financial funtion divide", function () {
	testCases.forEach(testCase => {
		const [left, right, expectedResult] = testCase;
		it(
			`Should be ${JSON.stringify(left)} / ${JSON.stringify(right)} = ${JSON.stringify(expectedResult)}`,
			function () {
				const result = financial.divide(left, right);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			});
	});
});
