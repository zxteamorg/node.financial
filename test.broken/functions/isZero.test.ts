import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	isZero: Array<[zxteam.Financial, boolean]>;
}

const positiveTestCases: TestCases = {
	isZero: [
		[{ value: "6", fraction: 0 }, false],
		[{ value: "12313", fraction: 0 }, false],
		[{ value: "4534535", fraction: 0 }, false],
		[{ value: "4567234", fraction: 8 }, false],
		[{ value: "0", fraction: 0 }, true]
	]
};

describe("isZero", function () {
	positiveTestCases.isZero.forEach(isZeroCase => {
		const [first, boolean] = isZeroCase;
		it(`Should be check isZero "${JSON.stringify(first)}" = is: "${JSON.stringify(boolean)}"`,
			function () {
				const result = Financial.isZero(first);
				assert.equal(result, boolean);
			});
	});
});
