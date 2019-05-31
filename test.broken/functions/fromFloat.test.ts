import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	fromFloat: Array<[[number, number], [string, number]]>;
}

const positiveTestCases: TestCases = {
	fromFloat: [
		[[0.000999, 6], ["999", 6]],
		[[0.00000001, 8], ["1", 8]],
		[[-0.5, 1], ["-5", 1]],
		[[1001, 0], ["1001", 0]],
		[[10010, 0], ["10010", 0]],
		[[-999, 0], ["-999", 0]],
		[[1001.101, 3], ["1001101", 3]]
	]
};

describe("Financial funtion fromFloat", function () {
	positiveTestCases.fromFloat.forEach(fromFloatCase => {
		const [input, expectedResult] = fromFloatCase;
		const [inputValue, inputFraction] = input;
		const [expectedValue, expectedFraction] = expectedResult;
		// tslint:disable-next-line:max-line-length
		it(`Should create by v:${inputValue} and f:${inputFraction} to v:"${expectedValue}" and fraction:${expectedFraction}`, function () {
			const result = Financial.fromFloat(inputValue, inputFraction);
			assert.equal(result.value, expectedValue);
			assert.equal(result.fraction, expectedFraction);
		});
	});
});
