import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[
	/*left: */string,
	/*right: */string,
	/*expectedResult: */string,
	/*fractionalDigits: */number,
	/*roundMode: */FinancialLike.RoundMode,
	/*backends: */Array<Settings.Backend>
]>;

const testCases: TestCases = [
	["10", "3", "3.3333333333", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-10", "-3", "3.3333333333", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["10", "-3", "-3.3333333333", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-10", "3", "-3.3333333333", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["10", "3", "3.3333333334", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-10", "-3", "3.3333333334", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["10", "-3", "-3.3333333333", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-10", "3", "-3.3333333333", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["10", "3", "3.3333333333", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-10", "-3", "3.3333333333", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["10", "-3", "-3.3333333334", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-10", "3", "-3.3333333334", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["10", "3", "3.3333333333", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-10", "-3", "3.3333333333", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["10", "-3", "-3.3333333333", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-10", "3", "-3.3333333333", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["1331234.3000100011", "21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.02", "63331.7935304473", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.02", "63331.7935304473", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.02", "-63331.7935304473", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.02", "-63331.7935304473", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.02", "63331.7935304472", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.02", "-63331.7935304472", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["1331234.3000100011", "21.01", "63361.9371732509", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.01", "63361.9371732509", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.01", "-63361.9371732509", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.01", "-63361.9371732509", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.01", "63361.9371732509", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.01", "63361.9371732509", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.01", "-63361.9371732508", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.01", "-63361.9371732508", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.01", "63361.9371732508", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.01", "63361.9371732508", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.01", "-63361.9371732509", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.01", "-63361.9371732509", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "21.01", "63361.9371732508", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "-21.01", "63361.9371732508", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["1331234.3000100011", "-21.01", "-63361.9371732508", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-1331234.3000100011", "21.01", "-63361.9371732508", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	// Test-case: 24.2644184325 BTC need to divive to BCN price 0.00000017 should be equal 142731873.1323529411 BCN
	["24.2644184325", "0.00000017", "142731873.1323529411", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["24.2644184325", "0.00000017", "142731873.1323529412", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["24.2644184325", "0.00000017", "142731873.1323529412", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["24.2644184325", "0.00000017", "142731873.1323529411", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	// Test-case: 0 BTC need to divide to BCN price 0.00000017 should be equal 0.0
	["0", "0.00000017", "0", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["1333.5", "21.000001", "63.49999697", 8, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["1333", "21.000001", "63.47618745", 8, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["1333", "21.000001", "63.47618746", 8, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["1333", "21.000001", "63.47618745", 8, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["1333", "21.000001", "63.47618745", 8, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	["324234234234.23423456", "234.34", "1383606017.89807217", 8, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	// tslint:disable-next-line: max-line-length
	["123456789012345123456789012345", "212345678", "581395346376417058306.16911517", 8, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["11.230707245", "1", "11.230707245", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["11.230707245", "1", "11.230707245", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["11.230707245", "1", "11.230707245", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["11.230707245", "1", "11.230707245", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	["1333", "21.0001", "63.47588821", 8, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [left, right, expectedResult, fractionalDigits, roundMode, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		// tslint:disable-next-line: max-line-length
		describe(`divide with roundMode: ${roundMode}, fractionalDigits: ${fractionalDigits} should be ${left} / ${right} = ${expectedResult}`, function () {

			it("financial.divide(left: string, right: string): string", function () {
				const result: string = financial.divide(left, right);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.divide(left: FinancialLike, right: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = financial.divide(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.divide(value: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = friendlyLeft.divide(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
