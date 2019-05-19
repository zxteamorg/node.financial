import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function parse", function () {
	it("financial.parse(value: string): Financial", () => {
		const value = "101.5";
		const result = financial.parse(value); // return Financial
		// console.log(result.toString());       // "101.5"
		// console.log(result.toFloat());        // 101.5

		assert.equal(financial.toString(result), "101.5");
		assert.equal(financial.toFloat(result), 101.5);
		assert.equal(result.value, "1015");
		assert.equal(result.fraction, 1);
	});
});
