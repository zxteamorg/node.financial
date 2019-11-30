import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*left: */string, /*right: */string, /*expectedResult: */string, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = FinancialLike.RoundMode.Round;

const testCases: TestCases = [
	["5", "5", "10", [Settings.Backend.bignumberjs]],
	["-5", "5", "0", [Settings.Backend.bignumberjs]],
	["0.1", "0.2", "0.3", [Settings.Backend.bignumberjs]],
	["0.00000000001", "0.00000000002", "0", [Settings.Backend.bignumberjs]], // should be round to zero according fractionalDigits === 10
	["0", "0.2", "0.2", [Settings.Backend.bignumberjs]],
	["354793854793875498379548374958", "3485739854", "354793854793875498383034114812", [Settings.Backend.bignumberjs]],
	["35479385479387549837954837.495835", "13.485739", "35479385479387549837954850.981574", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`add should be ${left} + ${right} = ${expectedResult}`, function () {

			it("financial.add(left: string, right: string): string", function () {
				const result: string = financial.add(left, right);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.add(left: FinancialLike, right: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = financial.add(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.add(right: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = friendlyLeft.add(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
