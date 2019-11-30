import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*value: */string, /*expectedResult: */string, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = FinancialLike.RoundMode.Round;

const testCases: TestCases = [
	["5", "-5", [Settings.Backend.bignumberjs]],
	["-5", "5",  [Settings.Backend.bignumberjs]],
	["0.1", "-0.1", [Settings.Backend.bignumberjs]],
	["-0.1", "0.1", [Settings.Backend.bignumberjs]],
	["0.00000000001", "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["-0.00000000001", "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["354793854793875498379548374958", "-354793854793875498379548374958", [Settings.Backend.bignumberjs]],
	["-354793854793875498379548374958", "354793854793875498379548374958", [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", "-35479385479387549837954837.495835", [Settings.Backend.bignumberjs]],
	["-35479385479387549837954837.495835", "35479385479387549837954837.495835", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`inverse should be ${test} => ${expectedResult}`, function () {

			it("financial.inverse(value: string): string", function () {
				const result: string = financial.inverse(test);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.inverse(value: FinancialLike): FinancialLike", function () {
				const friendlyTest: FinancialLike = financial.parse(test);
				const result: FinancialLike = financial.inverse(friendlyTest);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.inverse(): FinancialLike", function () {
				const friendlyTest: FinancialLike = financial.parse(test);
				const result: FinancialLike = friendlyTest.inverse();
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
