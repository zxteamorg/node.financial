import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*value: */string, /*expectedResult: */number, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = FinancialLike.RoundMode.Round;

const testCases: TestCases = [
	["5", 5, [Settings.Backend.bignumberjs]],
	["-5", -5,  [Settings.Backend.bignumberjs]],
	["0.1", 0.1, [Settings.Backend.bignumberjs]],
	["-0.1", -0.1, [Settings.Backend.bignumberjs]],
	["0.00000000001", 0, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["-0.00000000001", 0, [Settings.Backend.bignumberjs]] // should be round to zero according fractionalDigits === 10
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`toFloat should be ${test} => ${expectedResult}`, function () {

			it("financial.toFloat(value: FinancialLike): number", function () {
				const friendlyTest: FinancialLike = financial.parse(test);
				const result: number = financial.toFloat(friendlyTest);
				assert.equal(result, expectedResult);
			});

			it("value.toFloat(): number", function () {
				const friendlyTest: FinancialLike = financial.parse(test);
				const result: number = friendlyTest.toFloat();
				assert.equal(result, expectedResult);
			});
		});
	});
});
