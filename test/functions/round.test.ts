import { assert } from "chai";
import { Financial } from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	round: Array<[zxteam.Financial, number, zxteam.Financial]>;
}

const positiveTestCases: TestCases = {
	round: [
		[{ value: "-12395", fraction: 2 }, 1, { value: "-1239", fraction: 1 }], // Math.round(-1239.5) => -1239
		[{ value: "12395", fraction: 2 }, 1, { value: "1240", fraction: 1 }],  // Math.round(1239.5) => 1240
		[{ value: "12359", fraction: 2 }, 1, { value: "1236", fraction: 1 }],
		[{ value: "12399", fraction: 2 }, 1, { value: "1240", fraction: 1 }],
		[{ value: "12399", fraction: 2 }, 0, { value: "124", fraction: 0 }],
		[{ value: "-15551", fraction: 3 }, 1, { value: "-156", fraction: 1 }], // Math.round(-155.51) => -156
		[{ value: "1555", fraction: 1 }, 0, { value: "156", fraction: 0 }], // Math.round(155.50) => 156
		[{ value: "-1555", fraction: 1 }, 0, { value: "-155", fraction: 0 }], // Math.round(-155.50) => -155
		[{ value: "1555", fraction: 2 }, 1, { value: "156", fraction: 1 }], // Math.round(155.50) => 156
		[{ value: "-1555", fraction: 2 }, 1, { value: "-155", fraction: 1 }], // Math.round(-155.50) => -155
		[{ value: "15551", fraction: 2 }, 0, { value: "156", fraction: 0 }], // Math.round(155.51) => 156
		[{ value: "-15551", fraction: 2 }, 0, { value: "-156", fraction: 0 }], // Math.round(-155.51) => -156
		[{ value: "1559", fraction: 3 }, 2, { value: "156", fraction: 2 }],
		[{ value: "1555", fraction: 3 }, 2, { value: "156", fraction: 2 }],
		[{ value: "1554", fraction: 3 }, 2, { value: "155", fraction: 2 }],
		[{ value: "-1554", fraction: 3 }, 2, { value: "-155", fraction: 2 }],
		[{ value: "1551", fraction: 3 }, 2, { value: "155", fraction: 2 }],
		[{ value: "1551", fraction: 3 }, 8, { value: "1551", fraction: 3 }],
		[{ value: "3", fraction: 1 }, 1, { value: "3", fraction: 1 }],
		[{ value: "3", fraction: 1 }, 3, { value: "3", fraction: 1 }],
		[{ value: "-83475643", fraction: 8 }, 5, { value: "-83476", fraction: 5 }],
		[{ value: "1759", fraction: 3 }, 0, { value: "2", fraction: 0 }],
		[{ value: "1759", fraction: 3 }, 8, { value: "1759", fraction: 3 }],
		[{ value: "15012341", fraction: 5 }, 4, { value: "1501234", fraction: 4 }],
		[{ value: "14273187313235", fraction: 5 }, 5, { value: "14273187313235", fraction: 5 }],
		[{ value: "12399", fraction: 2 }, 1, { value: "1240", fraction: 1 }],
		[{ value: "1427318731323529482", fraction: 10 }, 10, { value: "1427318731323529482", fraction: 10 }],
		[{ value: "1427318731323529482", fraction: 10 }, 1, { value: "1427318731", fraction: 1 }],
		[{ value: "23847923749283428934792374345345345", fraction: 5 }, 0, { value: "238479237492834289347923743453", fraction: 0 }],
		[{ value: "23847923749283428934792374345344345", fraction: 5 }, 1, { value: "2384792374928342893479237434534", fraction: 1 }],
		[{ value: "23847923749283428934792374345345", fraction: 2 }, 1, { value: "2384792374928342893479237434535", fraction: 1 }],
		[{ value: "23847923749283428934792374345345345", fraction: 5 }, 1, { value: "2384792374928342893479237434535", fraction: 1 }],
		[{ value: "-23847923749283428934792374345344345", fraction: 5 }, 1, { value: "-2384792374928342893479237434534", fraction: 1 }],
		[{ value: "-23847923749283428934792374345345", fraction: 2 }, 1, { value: "-2384792374928342893479237434534", fraction: 1 }],
		[{ value: "-23847923749283428934792374345345345", fraction: 5 }, 1, { value: "-2384792374928342893479237434535", fraction: 1 }]
	]
};

describe("round", function () {
	positiveTestCases.round.forEach(roundCase => {
		const [input, newFraction, expectedResult] = roundCase;
		it(`Should round financial "${JSON.stringify(input)}" for new fraction ${newFraction} to value:"${JSON.stringify(expectedResult)}"`,
			function () {
				const result = Financial.round(input, newFraction);
				assert.equal(result.value, expectedResult.value);
				assert.equal(result.fraction, expectedResult.fraction);
			});
	});
});
