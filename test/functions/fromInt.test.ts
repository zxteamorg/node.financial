import { assert } from "chai";
import Financial from "../../src/index";

interface TestCases {
	fromInt: Array<[number, string]>;
}

const positiveTestCases: TestCases = {
	fromInt: [
		[999, "999"],
		[10010, "10010"],
		[-12310010, "-12310010"]
	]
};

describe("fromInt", function () {
	positiveTestCases.fromInt.forEach(fromIntCase => {
		const [inputValue, expectedValue] = fromIntCase;
		// tslint:disable-next-line:max-line-length
		it(`Should create by v:${inputValue} to v:"${expectedValue}" and fraction:0`, function () {
			const result = Financial.fromInt(inputValue);
			assert.equal(result.value, expectedValue);
			assert.equal(result.fraction, 0);
		});
	});
});
