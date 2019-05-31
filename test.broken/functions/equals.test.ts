import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	equals: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
}

const positiveTestCases: TestCases = {
	equals: [
		[{ value: "5", fraction: 0 }, { value: "5", fraction: 0 }, true],
		[{ value: "-5", fraction: 0 }, { value: "5", fraction: 0 }, false],
		[{ value: "1", fraction: 1 }, { value: "2", fraction: 1 }, false],
		[{ value: "0", fraction: 0 }, { value: "2", fraction: 1 }, false],
		[{ value: "12354627856", fraction: 8 }, { value: "212648543", fraction: 8 }, false],
		[{ value: "354793854793875498379548374958", fraction: 0 }, { value: "3485739854", fraction: 0 }, false],
		// tslint:disable-next-line:max-line-length
		[{ value: "35479385479387549837954837495835", fraction: 6 }, { value: "35479385479387549837954837495835", fraction: 6 }, true],
		[{ value: "-35479385479387549837954837495835", fraction: 8 }, { value: "-35479385479387549837954837495835", fraction: 8 }, true],
		[{ value: "-35479385479387549837954837495835", fraction: 8 }, { value: "-35479385479387549837954837495835", fraction: 10 }, false],
		[{ value: "35479385479387549837954837495835", fraction: 8 }, { value: "35479385479387549837954837495835", fraction: 15 }, false],
		[{ value: "35479385479387549837954837495835", fraction: 10 }, { value: "-35479385479387549837954837495835", fraction: 10 }, false]
	]
};

describe("Financial funtion equals", function () {
	positiveTestCases.equals.forEach(equalsCase => {
		const [left, right, expectedBoolean] = equalsCase;
		it(
			// tslint:disable-next-line: max-line-length
			`Should be ${JSON.stringify(left)} === ${JSON.stringify(right)} = is ${expectedBoolean}`,
			function () {
				const result = Financial.equals(left, right);
				assert.equal(result, expectedBoolean);
			});
	});
});
