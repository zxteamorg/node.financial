import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup, FinancialOperation, Settings } from "../../src/index";

type TestCases = Array<[/*value: */string, /*expectedResult: */string, /*backends: */Array<Settings.Backend>]>;

const fractionalDigits = 10;
const roundMode = zxteam.Financial.RoundMode.Round;

const testCases: TestCases = [
	["10.9580266", "10.9580266", [Settings.Backend.bignumberjs]],
	["10.95802660", "10.9580266", [Settings.Backend.bignumberjs]],
	["10.958026600", "10.9580266", [Settings.Backend.bignumberjs]],
	["10.9580266000", "10.9580266", [Settings.Backend.bignumberjs]],
	["10.95802660000", "10.9580266", [Settings.Backend.bignumberjs]]
];

testCases.forEach(function (testCase) {
	// Unwrap test case data
	const [test, expectedResult, backends] = testCase;

	backends.forEach(function (backend: Settings.Backend) {
		// Configure financial operations
		const financial: FinancialOperation = setup(
			backend, { decimalSeparator: ".", defaultRoundOpts: { fractionalDigits, roundMode } }
		);

		describe(`parse should be ${test} => ${expectedResult}`, function () {

			it("financial.parse(value: string): zxteam.Financial", function () {
				const friendlyTest: zxteam.Financial = financial.parse(test);
				assert.equal(friendlyTest.toString(), expectedResult);
			});
		});
	});
});

