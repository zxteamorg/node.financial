import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*left: */string, /*right: */string, /*expectedResult: */string, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

const testCases: TestCases = [
	["5", "10", "5", [Settings.Backend.bignumberjs]],
	["-5", "5", "-5", [Settings.Backend.bignumberjs]],
	["0.1", "0.2", "0.1", [Settings.Backend.bignumberjs]],
	["0.1", "-0.2", "-0.2", [Settings.Backend.bignumberjs]],
	["0.00000000001", "0.00000000002", "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0", "0.2", "0", [Settings.Backend.bignumberjs]],
	["354793854793875498379548374958", "3485739854", "3485739854", [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", "13.485739", "13.485739", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`min should be ${left} vs ${right} = ${expectedResult}`, function () {

			it("financial.min(left: string, right: string): string", function () {
				const result: string = financial.min(left, right);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.min(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: zxteam.Financial = financial.min(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.add(right: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: zxteam.Financial = friendlyLeft.min(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
