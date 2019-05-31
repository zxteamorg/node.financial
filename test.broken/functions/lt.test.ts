import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	lt: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
}

const positiveTestCases: TestCases = {
	lt: [
		[{ value: "6", fraction: 0 }, { value: "-2", fraction: 0 }, false],
		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, false],
		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, false],
		[{ value: "6", fraction: 0 }, { value: "105", fraction: 1 }, true],
		[{ value: "1", fraction: 7 }, { value: "3", fraction: 8 }, false],
		[{ value: "-1", fraction: 7 }, { value: "3", fraction: 8 }, true],
		[{ value: "-100002", fraction: 0 }, { value: "-100001", fraction: 0 }, true],
		[{ value: "3", fraction: 5 }, { value: "3", fraction: 5 }, false],
		[{ value: "6", fraction: 0 }, { value: "8", fraction: 0 }, true],
		[{ value: "2342342", fraction: 0 }, { value: "37593547983754937954873548739593845", fraction: 0 }, true],
		[{ value: "2342342", fraction: 0 }, { value: "-37593547983754937954873548739593845", fraction: 0 }, false],
		[{ value: "37593547983754937954873548739593845", fraction: 5 }, { value: "37593547983754937954873548739593845", fraction: 5 }, false]
	]
};

describe("lt", function () {
	positiveTestCases.lt.forEach(ltCase => {
		const [first, second, boolean] = ltCase;
		it(`Should lt financial "${JSON.stringify(first)}" < fraction "${JSON.stringify(second)}" to value: "${JSON.stringify(boolean)}"`,
			function () {
				const result = Financial.lt(first, second);
				assert.equal(result, boolean);
			});
	});
});
