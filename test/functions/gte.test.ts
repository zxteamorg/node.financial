import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*left: */string, /*right: */string, /*expectedResult: */boolean, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = FinancialLike.RoundMode.Round;

const testCases: TestCases = [
	["6", "5", true, [Settings.Backend.bignumberjs]],
	["5", "5", true, [Settings.Backend.bignumberjs]],
	["-5", "5", false, [Settings.Backend.bignumberjs]],
	["0.1", "0.2", false, [Settings.Backend.bignumberjs]],
	["0.00000000002", "0.00000000001", true, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0.00000000001", "0.00000000002", true, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0", "0.2", false, [Settings.Backend.bignumberjs]],
	["354793854793875498379548374958", "3485739854", true, [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", "13.485739", true, [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`gte should be ${left} >= ${right} = ${expectedResult}`, function () {

			it("financial.gte(left: string, right: string): boolean", function () {
				const result: boolean = financial.gte(left, right);
				assert.equal(result, expectedResult);
			});

			it("financial.gte(left: FinancialLike, right: FinancialLike): boolean", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: boolean = financial.gte(friendlyLeft, friendlyRight);
				assert.equal(result, expectedResult);
			});

			it("value.gte(right: FinancialLike): boolean", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: boolean = friendlyLeft.gte(friendlyRight);
				assert.equal(result, expectedResult);
			});
		});
	});
});
