import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[
	/*value: */string,
	/*expectedResult: */string,
	/*fractionalDigits: */number,
	/*roundMode: */FinancialLike.RoundMode,
	/*backends: */Array<Settings.Backend>
]>;

const testCases: TestCases = [
	// Math.round(55.5) => 56
	["0.555", "0.56", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.round(-55.5) => -55
	["-0.555", "-0.55", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.ceil(55.5) => 56
	["0.555", "0.56", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	//Math.ceil(-55.5) => -55
	["-0.555", "-0.55", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	// Math.floor(55.5) => 55
	["0.555", "0.55", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	// Math.floor(-55.5) => -56
	["-0.555", "-0.56", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	["0.555", "0.55", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.555", "-0.55", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],


	// Math.round(0.99) => 1
	["0.099", "0.1", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.round(-0.99) => -1
	["-0.099", "-0.1", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.ceil(0.99) => 1
	["0.099", "0.1", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	//Math.ceil(-0.99) => 0
	["-0.099", "-0.09", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	// Math.floor(0.99) => 0
	["0.099", "0.09", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	// Math.floor(-0.99) => -1
	["-0.099", "-0.1", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	["0.099", "0.09", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.099", "-0.09", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],


	// Math.round(0.11) => 0
	["0.011", "0.01", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.round(-0.11) => -0
	["-0.011", "-0.01", 2, FinancialLike.RoundMode.Round, [Settings.Backend.bignumberjs]],

	// Math.ceil(0.11) => 1
	["0.011", "0.02", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	// Math.ceil(-0.11) => -0
	["-0.011", "-0.01", 2, FinancialLike.RoundMode.Ceil, [Settings.Backend.bignumberjs]],

	// Math.floor(0.11) => 0
	["0.011", "0.01", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	// Math.floor(-0.11) => -1
	["-0.011", "-0.02", 2, FinancialLike.RoundMode.Floor, [Settings.Backend.bignumberjs]],

	["0.011", "0.01", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]],
	["-0.011", "-0.01", 2, FinancialLike.RoundMode.Trunc, [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [value, expectedResult, fractionalDigits, roundMode, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits: 10, roundMode } }
		);

		// tslint:disable-next-line: max-line-length
		describe(`round with roundMode: ${roundMode}, fractionalDigits: ${fractionalDigits} should be ${value} => ${expectedResult}`, function () {

			it("financial.round(value: string, fractionDigits: FinancialLike.FractionDigits): string", function () {
				const result: string = financial.round(value, fractionalDigits);
				assert.isString(result);
				assert.equal(result, expectedResult);
			});

			it("financial.round(value: FinancialLike, fractionDigits: FinancialLike.FractionDigits): FinancialLike", function () {
				const friendlyValue: FinancialLike = financial.parse(value);
				const result: FinancialLike = financial.round(friendlyValue, fractionalDigits);
				assert.equal(result.toString(), expectedResult);
			});

			it("value.round(fractionalDigits: Financial.FractionDigits): FinancialLike", function () {
				const friendlyValue: FinancialLike = financial.parse(value);
				const result: FinancialLike = friendlyValue.round(fractionalDigits);
				assert.equal(result.toString(), expectedResult);
			});
		});
	});
});
