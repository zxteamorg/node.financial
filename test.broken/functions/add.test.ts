import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	add: Array<[zxteam.Financial, zxteam.Financial, [string, number]]>;
}

const positiveTestCases: TestCases = {
	add: [
		[{ value: "5", fraction: 0 }, { value: "5", fraction: 0 }, ["10", 0]],
		[{ value: "-5", fraction: 0 }, { value: "5", fraction: 0 }, ["0", 0]],
		[{ value: "1", fraction: 1 }, { value: "2", fraction: 1 }, ["3", 1]],
		[{ value: "0", fraction: 0 }, { value: "2", fraction: 1 }, ["2", 1]],
		[{ value: "12354627856", fraction: 8 }, { value: "212648543", fraction: 8 }, ["12567276399", 8]],
		[{ value: "354793854793875498379548374958", fraction: 0 }, { value: "3485739854", fraction: 0 }, ["354793854793875498383034114812", 0]],
		// tslint:disable-next-line:max-line-length
		[{ value: "35479385479387549837954837495835", fraction: 6 }, { value: "13485739", fraction: 6 }, ["35479385479387549837954850981574", 6]]
	]
};

describe("Financial funtion add", function () {
	positiveTestCases.add.forEach(addCase => {
		const [left, right, expectedResult] = addCase;
		const [expectedValue, expectedFraction] = expectedResult;
		it(
			// tslint:disable-next-line: max-line-length
			`Should be ${JSON.stringify(left)} + ${JSON.stringify(right)} = ${expectedResult}`,
			function () {
				const result = Financial.add(left, right);
				assert.equal(result.value, expectedValue);
				assert.equal(result.fraction, expectedFraction);
			});
	});
});
