import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	parse: Array<[string, [string, number]]>;
}

const positiveTestCases: TestCases = {
	parse: [
		["0.000999", ["999", 6]],
		["0.00000001", ["1", 8]],
		["-0.5", ["-5", 1]],
		["1001", ["1001", 0]],
		["10010", ["10010", 0]],
		["-999", ["-999", 0]],
		["1001.1010000", ["1001101", 3]],
		["43759834597395873954873548.123456789", ["43759834597395873954873548123456789", 9]],
		["43759834597395873954873548.123456789000", ["43759834597395873954873548123456789", 9]],
		["-43759834597395873954873548.489000", ["-43759834597395873954873548489", 3]]
	]
};
describe("parse", function () {
	positiveTestCases.parse.forEach(parseCase => {
		const [input, expectedResult] = parseCase;
		const [expectedValue, expectedFraction] = expectedResult;
		it(`Should parse string value "${input}" to v:"${expectedValue}" and fraction:${expectedFraction}`, function () {
			const result = Financial.parse(input);
			assert.equal(result.value, expectedValue);
			assert.equal(result.fraction, expectedFraction);
		});
	});
});
