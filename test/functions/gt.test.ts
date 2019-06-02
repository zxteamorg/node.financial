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
	[{ sign: "+", whole: "600", fractional: "9" }, { sign: "+", whole: "600", fractional: "9" }, false],
	[{ sign: "+", whole: "6", fractional: "0" }, { sign: "-", whole: "2", fractional: "0" }, true]
	// [{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, true],
	// [{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, true],
	// [{ value: "6", fraction: 0 }, { value: "105", fraction: 1 }, false],
	// [{ value: "1", fraction: 7 }, { value: "3", fraction: 8 }, true],
	// [{ value: "-1", fraction: 7 }, { value: "3", fraction: 8 }, false],
	// [{ value: "-100002", fraction: 0 }, { value: "-100001", fraction: 0 }, false],
	// [{ value: "3", fraction: 5 }, { value: "3", fraction: 5 }, false],
	// [{ value: "6", fraction: 0 }, { value: "8", fraction: 0 }, false],
	// [{ value: "34857332423985479385470938547", fraction: 0 }, { value: "8", fraction: 0 }, true],
	// [{ value: "-3234248573985479385470938547", fraction: 0 }, { value: "8", fraction: 0 }, false],
	// [{ value: "3234248573985479385470938547", fraction: 3 }, { value: "385738547938547345345345", fraction: 12 }, true],
	// [{ value: "3234248573985479385470938547", fraction: 3 }, { value: "385738547938547345345345", fraction: 12 }, true]
];

describe("gt", function () {
	testCases.forEach(testCase => {
		const [first, second, expectedResult] = testCase;
		it(
			`Should gt financial "${JSON.stringify(first)}" > fraction "${JSON.stringify(second)}" to value: "${expectedResult}"`,
			function () {
				const result = financial.gt(first, second);
				assert.equal(result, expectedResult);
			}
		);
	});
});
