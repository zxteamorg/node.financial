import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*left: */string, /*right: */string, /*expectedResult: */boolean, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

const testCases: TestCases = [
	["5", "5", true, [Settings.Backend.bignumberjs]],
	["-5", "5", false, [Settings.Backend.bignumberjs]],
	["0.1", "0.1", true, [Settings.Backend.bignumberjs]],
	["-0.1", "0.1", false, [Settings.Backend.bignumberjs]],
	["0.00000000001", "0", true, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["-0.00000000001", "0", true, [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["354793854793875498379548374958", "354793854793875498379548374958", true, [Settings.Backend.bignumberjs]],
	["-354793854793875498379548374958", "354793854793875498379548374958", false, [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", "35479385479387549837954837.495835", true, [Settings.Backend.bignumberjs]],
	["-35479385479387549837954837.495835", "35479385479387549837954837.495835", false, [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		const msg = expectedResult === true ? "===" : "!==";
		describe(`equals should be ${left} ${msg} ${right}`, function () {

			it("financial.equals(left: string, right: string): string", function () {
				const result: boolean = financial.equals(left, right);
				assert.strictEqual(result, expectedResult);
			});

			it("financial.equals(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: boolean = financial.equals(friendlyLeft, friendlyRight);
				assert.strictEqual(result, expectedResult);
			});

			it("value.equals(right: zxteam.Financial): zxteam.Financial", function () {
				const friendlyLeft: zxteam.Financial = financial.parse(left);
				const friendlyRight: zxteam.Financial = financial.parse(right);
				const result: boolean = friendlyLeft.equals(friendlyRight);
				assert.strictEqual(result, expectedResult);
			});
		});
	});
});
