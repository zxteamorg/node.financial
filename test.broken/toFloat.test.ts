import { assert } from "chai";
import { Financial } from "../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	positive: Array<[zxteam.Financial/*test value*/, number/*expected result*/]>;
	negative: Array<[zxteam.Financial/*test value*/, string/*expected error message*/]>;
}

const testCases: TestCases = {
	positive: [
		[{ value: "1559", fraction: 3 }, 1.559],
		[{ value: "-1559", fraction: 3 }, -1.559],
		[{ value: "1559", fraction: 4 }, 0.1559],
		[{ value: "-1559", fraction: 4 }, -0.1559],
		[{ value: "1559", fraction: 5 }, 0.01559],
		[{ value: "-1559", fraction: 5 }, -0.01559],
		[{ value: "1559", fraction: 6 }, 0.001559],
		[{ value: "-1559", fraction: 6 }, -0.001559]
	],
	negative: []
};

describe("toFloat tests", function () {
	testCases.positive.forEach(function (testCase) {
		const [input, expectedResult] = testCase;
		it(`Should toFloat "${JSON.stringify(input)}" to value:"${expectedResult}"`,
			function () {
				const result = Financial.toFloat(input);
				assert.equal(result, expectedResult);
			});
	});

	testCases.negative.forEach(function (testCase) {
		const [input, expectedErrorMessage] = testCase;
		it(`Should NOT toFloat "${JSON.stringify(input)}" with error message:"${expectedErrorMessage}"`,
			function () {
				let expectedError;
				try {
					Financial.toFloat(input);
				} catch (e) {
					expectedError = e;
				}
				assert.isDefined(expectedError, "toFloat() should raise error in this case, but no error.");
				assert.equal(expectedError.message, expectedErrorMessage);
			});
	});
});
