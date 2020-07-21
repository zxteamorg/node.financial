import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*value: */number, /*expectedResult: */string, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 2;
const roundMode = FinancialLike.RoundMode.Round;

const testCases: TestCases = [
	[0.001, "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 2
	[-0.001, "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 2
	[-0.009, "-0.01", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 2
	[0.009, "0.01", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 2
	[424242424242424242424242.424242424242424242421111, "424242424242424200000000", [Settings.Backend.bignumberjs]],
	[4.242424242424242e+23, "424242424242424200000000", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`fromFloat should be ${test} => ${expectedResult}`, function () {

			it("financial.fromFloat(value: number): Financial", function () {
				const result: FinancialLike = financial.fromFloat(test);
				const friendlyResult = result.toString();
				assert.isString(friendlyResult);
				assert.equal(friendlyResult, expectedResult);
			});
		});
	});
});
