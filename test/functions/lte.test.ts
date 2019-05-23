import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	lte: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
}

const positiveTestCases: TestCases = {
	lte: [
		[{ value: "6", fraction: 0 }, { value: "6", fraction: 0 }, true],
		[{ value: "6", fraction: 0 }, { value: "3", fraction: 0 }, false],
		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, false],
		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, false],
		[{ value: "6", fraction: 0 }, { value: "123", fraction: 0 }, true],
		[{ value: "-10002", fraction: 0 }, { value: "-10002", fraction: 0 }, true],
		[{ value: "-10002", fraction: 0 }, { value: "-10003", fraction: 0 }, false],
		[{ value: "0", fraction: 0 }, { value: "0", fraction: 0 }, true],
		[{ value: "1", fraction: 5 }, { value: "-1", fraction: 5 }, false],
		[{ value: "3", fraction: 1 }, { value: "3", fraction: 1 }, true],
		[{ value: "89173819231792387198", fraction: 1 }, { value: "1231231238", fraction: 1 }, false],
		[{ value: "89173819231792387198", fraction: 8 }, { value: "98898989898989812381231", fraction: 0 }, true],
		[{ value: "98898989898989812381231", fraction: 4 }, { value: "98898989898989812381231", fraction: 4 }, true]
	]
};


describe("lte", function () {
	positiveTestCases.lte.forEach(lteCase => {
		const [first, second, boolean] = lteCase;
		it(`Should lte financial "${JSON.stringify(first)}" <= fraction "${JSON.stringify(second)}" to value: "${JSON.stringify(boolean)}"`,
			function () {
				const result = Financial.lte(first, second);
				assert.equal(result, boolean);
			});
	});
});
