import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type PositiveTestCases = Array<[/*value: */string, /*expectedResult: */number, /*backends: */Array<Settings.Backend>]>;
type ErrorsTestCases = Array<[/*value: */string,  /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

const positiveTestCases: PositiveTestCases = [
	["5", 5, [Settings.Backend.bignumberjs]],
	["-5", -5, [Settings.Backend.bignumberjs]]
];


const errorsTestCases: ErrorsTestCases = [
	["5.123", [Settings.Backend.bignumberjs]],
	["-5.123", [Settings.Backend.bignumberjs]]
];


positiveTestCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`toInt should be ${test} => ${expectedResult}`, function () {

			it("financial.toInt(value: zxteam.Financial): number", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				const result: number = financial.toInt(friendlyTest);
				assert.equal(result, expectedResult);
			});

			it("value.toInt(): number", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				const result: number = friendlyTest.toInt();
				assert.equal(result, expectedResult);
			});
		});
	});
});

errorsTestCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`toInt should raise error on value ${test}`, function () {

			it("financial.toInt(value: zxteam.Financial): number", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				let err;
				try {
					financial.toInt(friendlyTest);
				} catch (e) {
					err = e;
				}
				assert.isDefined(err);
			});

			it("value.toInt(): number", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				let err;
				try {
					friendlyTest.toInt();
				} catch (e) {
					err = e;
				}
				assert.isDefined(err);
			});
		});
	});
});


describe(`round + toInt should works`, function () {
	// Configure financial operations
	const financial: FinancialOperation = setup(
		Settings.Backend.bignumberjs, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
	);

	it("value.round(0).toInt(): number", function () {
		const value: zxteam.Financial = financial.parse("5.123");
		const result: number = value.round(0).toInt();
		assert.equal(result, 5);
	});
});
