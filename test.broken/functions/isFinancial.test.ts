import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	isFinancial: Array<[any, boolean]>;
}

const positiveTestCases: TestCases = {
	isFinancial: [
		[{ value: "6", fraction: 0 }, true],
		[{ value: "12313", fraction: 0 }, true],
		[{ value: "4534535", fraction: "0" }, false],
		[{ value: 34567234, fraction: 8 }, false]
	]
};

describe("isFinancial", function () {
	positiveTestCases.isFinancial.forEach(isFinancialCase => {
		const [first, boolean] = isFinancialCase;
		it(`Should be check financial "${JSON.stringify(first)}" = is: "${JSON.stringify(boolean)}"`,
			function () {
				const result = Financial.isFinancial(first);
				assert.equal(result, boolean);
			});
	});
});
