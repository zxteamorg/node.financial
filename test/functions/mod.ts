import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

type TestCases = Array<[
	/*left: */string,
	/*right: */string,
	/*expectedResult: */string,
	/*backends: */Array<Settings.Backend>
]>;

const testCases: TestCases = [
	["10", "3", "1", [Settings.Backend.bignumberjs]],
	["-10", "-3", "-1", [Settings.Backend.bignumberjs]],
	["10", "-3", "1", [Settings.Backend.bignumberjs]],
	["-10", "3", "-1", [Settings.Backend.bignumberjs]],

	["0.9", "0.91", "0.9", [Settings.Backend.bignumberjs]],
	["0.91", "0.91", "0", [Settings.Backend.bignumberjs]],
	["0.92", "0.91", "0.01", [Settings.Backend.bignumberjs]],

	["1331234.3000100011", "21.02", "16.6800100011", [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.02", "-16.6800100011", [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.02", "16.6800100011", [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.02", "-16.6800100011", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		// tslint:disable-next-line: max-line-length
		describe(`mod with roundMode: ${roundMode}, fractionalDigits: ${fractionalDigits} should be ${left} mod ${right} = ${expectedResult}`, function () {

			it("financial.mod(left: string, right: string): string", function () {
				const result: string = financial.mod(left, right);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: zxteam.Financial = financial.mod(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.mod(value: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: zxteam.Financial = friendlyLeft.mod(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
