import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function fromInt", function () {
	it("financial.fromInt(value: number): Financial", () => {
		const value = 42;
		const result = financial.fromInt(value); // return Financial
		// console.log(result.toString());       // "42"
		// console.log(result.toFloat());        // 42

		assert.equal(financial.toString(result), "42");
		assert.equal(financial.toFloat(result), value);
		assert.equal(result.value, "42");
		assert.equal(result.fraction, 0);
	});
});
