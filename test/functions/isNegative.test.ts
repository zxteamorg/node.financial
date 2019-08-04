import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*left: */string, /*expectedResult: */boolean, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

const testCases: TestCases = [
	["5", false, [Settings.Backend.bignumberjs]],
	["-5", true, [Settings.Backend.bignumberjs]],
	["0.1", false, [Settings.Backend.bignumberjs]],
	["-0.1", true, [Settings.Backend.bignumberjs]],
	["0.00000000002", false, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0.00000000001", false, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0", false, [Settings.Backend.bignumberjs]],
	["-354793854793875498379548374958", true, [Settings.Backend.bignumberjs]],
	["354793854793875498379548374958", false, [Settings.Backend.bignumberjs]],
	["-35479385479387549837954837.495835", true, [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", false, [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		const msg = expectedResult === true ? "negative" : "not negative";
		describe(`isNegative should be ${test} is ${msg}`, function () {

			it("financial.isNegative(test: zxteam.Financial): boolean", function () {
				const result: boolean = financial.isNegative(test);
				assert.equal(result, expectedResult);
			});

			it("financial.isNegative(test: zxteam.Financial): boolean", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				const result: boolean = financial.isNegative(friendlyTest);
				assert.equal(result, expectedResult);
			});

			it("value.isNegative(): boolean", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				const result: boolean = friendlyTest.isNegative();
				assert.equal(result, expectedResult);
			});
		});
	});
});
