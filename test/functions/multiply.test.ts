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
	["0.5", "3.3333333333", "1.6666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-0.5", "3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-0.5", "-3.3333333333", "1.6666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["0.5", "-3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["0.5", "3.3333333333", "1.6666666667", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-0.5", "3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-0.5", "-3.3333333333", "1.6666666667", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["0.5", "-3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["0.5", "3.3333333333", "1.6666666666", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-0.5", "3.3333333333", "-1.6666666667", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-0.5", "-3.3333333333", "1.6666666666", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["0.5", "-3.3333333333", "-1.6666666667", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["0.5", "3.3333333333", "1.6666666666", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.5", "3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.5", "-3.3333333333", "1.6666666666", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["0.5", "-3.3333333333", "-1.6666666666", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],

	["0.5000000001", "3.3333333333", "1.666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "3.3333333333", "-1.666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "-3.3333333333", "1.666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["0.5000000001", "-3.3333333333", "-1.666666667", 10, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],
	["0.5000000001", "3.3333333333", "1.666666667", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "3.3333333333", "-1.6666666669", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "-3.3333333333", "1.666666667", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["0.5000000001", "-3.3333333333", "-1.6666666669", 10, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],
	["0.5000000001", "3.3333333333", "1.6666666669", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "3.3333333333", "-1.666666667", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "-3.3333333333", "1.6666666669", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["0.5000000001", "-3.3333333333", "-1.666666667", 10, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],
	["0.5000000001", "3.3333333333", "1.6666666669", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "3.3333333333", "-1.6666666669", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.5000000001", "-3.3333333333", "1.6666666669", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["0.5000000001", "-3.3333333333", "-1.6666666669", 10, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]]
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
		describe(`multiply with roundMode: ${roundMode}, fractionalDigits: ${fractionalDigits} should be ${left} * ${right} = ${expectedResult}`, function () {

			it("financial.multiply(left: string, right: string): string", function () {
				const result: string = financial.multiply(left, right);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.multiply(left: FinancialLike, right: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = financial.multiply(friendlyLeft, friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.multiply(value: FinancialLike): FinancialLike", function () {
				const friendlyLeft: FinancialLike = financial.parse(left);
				const friendlyRight: FinancialLike = financial.parse(right);
				const result: FinancialLike = friendlyLeft.multiply(friendlyRight);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
