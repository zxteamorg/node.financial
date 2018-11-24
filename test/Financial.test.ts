import { assert } from "chai";

import { Financial } from "../src/index";

describe("Financial funtion tests", function () {
	it("Should be '2' + '3' = '5'", function () {
		const first = new Financial("2", 0);
		const second = new Financial("3", 0);
		const result = first.plus(second);
		assert.equal(result.toString(), "5");
	});

	it("Should be '3' - '2' = '1'", function () {
		const first = new Financial("3", 0);
		const second = new Financial("2", 0);
		const result = first.minus(second);
		assert.equal(result.toString(), "1");
	});

	it("Should be '3' * '2' = '6'", function () {
		const first = new Financial("3", 0);
		const second = new Financial("2", 0);
		const result = first.multiply(second);
		assert.equal(result.toString(), "6");
	});

	it("Should be '6' / '2' = '3'", function () {
		const first = new Financial("6", 0);
		const second = new Financial("2", 0);
		const result = first.divide(second);
		assert.equal(result.toString(), "3");
	});
});
