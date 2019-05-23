import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	mod: Array<[zxteam.Financial, zxteam.Financial, zxteam.Financial]>;
}

const positiveTestCases: TestCases = {
	mod: [
		[{ value: "10", fraction: 0 }, { value: "3", fraction: 0 }, { value: "1", fraction: 0 }],
		[{ value: "9", fraction: 0 }, { value: "3", fraction: 0 }, { value: "0", fraction: 0 }],
		[{ value: "10123", fraction: 3 }, { value: "3", fraction: 0 }, { value: "1123", fraction: 3 }],
		[{ value: "60090", fraction: 2 }, { value: "30030", fraction: 2 }, { value: "3", fraction: 1 }],
		[{ value: "0", fraction: 0 }, { value: "333", fraction: 1 }, { value: "0", fraction: 0 }],
		[{ value: "-10", fraction: 0 }, { value: "3", fraction: 1 }, { value: "-1", fraction: 1 }],
		[{ value: "1", fraction: 0 }, { value: "3", fraction: 0 }, { value: "1", fraction: 0 }],
		[{ value: "34512334485", fraction: 8 }, { value: "33225516", fraction: 8 }, { value: "24248877", fraction: 8 }],
		[{ value: "35479381231235479345", fraction: 0 }, { value: "2983479823723", fraction: 0 }, { value: "275432042546", fraction: 0 }]
	]
};

describe("mod", function () {
	positiveTestCases.mod.forEach(modCase => {
		const [first, second, result] = modCase;
		it(`Should mod financial "${JSON.stringify(first)}" / fraction "${JSON.stringify(second)}" to value: "${JSON.stringify(result)}"`,
			function () {
				const modResult = Financial.mod(first, second);
				assert.equal(modResult.fraction, result.fraction);
				assert.equal(modResult.value, result.value);
			});
	});
});
