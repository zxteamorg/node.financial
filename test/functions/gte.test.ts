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
	[{ sign: "+", whole: "6", fractional: "0" }, { sign: "+", whole: "6", fractional: "0" }, true],
	[{ sign: "+", whole: "6", fractional: "0" }, { sign: "+", whole: "3", fractional: "0" }, true]
	// [{ value: "6", fraction: 0 }, { value: "123", fraction: 0 }, false],
	// [{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, true],
	// [{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, true],
	// [{ value: "-10002", fraction: 0 }, { value: "-10002", fraction: 0 }, true],
	// [{ value: "-10002", fraction: 0 }, { value: "-10003", fraction: 0 }, true],
	// [{ value: "0", fraction: 0 }, { value: "0", fraction: 0 }, true],
	// [{ value: "1", fraction: 5 }, { value: "-1", fraction: 5 }, true],
	// [{ value: "3", fraction: 1 }, { value: "3", fraction: 1 }, true],
	// [{ value: "35793543985479385479387954324234", fraction: 1 }, { value: "98798457935479845345", fraction: 1 }, true],
	// [{ value: "98798457935479845234234345", fraction: 1 }, { value: "98798457935479845234234345", fraction: 1 }, true],
	// [{ value: "98798457935479845234234345", fraction: 1 }, { value: "99798457935479845234234345", fraction: 1 }, false]
];

describe("gte", function () {
	testCases.forEach(testCase => {
		const [first, second, expectedResult] = testCase;
		it(
			`Should gte financial "${JSON.stringify(first)}" >= fraction "${JSON.stringify(second)}" to value: "${expectedResult}"`,
			function () {
				const result = financial.gte(first, second);
				assert.equal(result, expectedResult);
			}
		);
	});
});
