import { Financial } from "@zxteam/contract";
import { assert } from "chai";
import { VISIBLE_FOR_TESTS } from "../src/index";

describe("splitParts tests", function () {

	it("fraction = 0", function () {
		// Given
		const num: Financial = { value: "100121", fraction: 0 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "100121");
		assert.equal(decimalPart, "0");
	});

	it("positive value with fraction lesser that value.length", function () {
		// Given
		const num: Financial = { value: "100121", fraction: 5 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "1");
		assert.equal(decimalPart, "00121");
	});

	it("positive value with fraction equal to value.length", function () {
		// Given
		const num: Financial = { value: "100121", fraction: 6 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "0");
		assert.equal(decimalPart, "100121");
	});

	it("positive value with fraction bigger that value.length", function () {
		// Given
		const num: Financial = { value: "100121", fraction: 7 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "0");
		assert.equal(decimalPart, "0100121");
	});

	it("positive value with fraction bigger that value.length", function () {
		// Given
		const num: Financial = { value: "100121", fraction: 10 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "0");
		assert.equal(decimalPart, "0000100121");
	});

	it("negative value with fraction lesser that value.length", function () {
		// Given
		const num: Financial = { value: "-100121", fraction: 5 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "-1");
		assert.equal(decimalPart, "00121");
	});

	it("negative value with fraction equal to value.length", function () {
		// Given
		const num: Financial = { value: "-100121", fraction: 6 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "-0");
		assert.equal(decimalPart, "100121");
	});

	it("negative value with fraction bigger that value.length", function () {
		// Given
		const num: Financial = { value: "-100121", fraction: 7 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "-0");
		assert.equal(decimalPart, "0100121");
	});

	it("negative value with fraction bigger that value.length", function () {
		// Given
		const num: Financial = { value: "-100121", fraction: 10 };

		// Operation
		const { wholePart, decimalPart } = VISIBLE_FOR_TESTS.splitParts(num);

		// Expected
		assert.equal(wholePart, "-0");
		assert.equal(decimalPart, "0000100121");
	});
});
