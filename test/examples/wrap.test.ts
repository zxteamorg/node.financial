import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function wrap", function () {
	it("financial.wrap(value: string): Financial", () => {
		const value = "1015";
		const fraction = 1;
		const result = financial.wrap({ value, fraction }); // return Financial
		// console.log(result.toString());                  // "101.5"
		// console.log(result.toFloat());                   // 101.5

		assert.equal(financial.toString(result), "101.5");
		assert.equal(financial.toFloat(result), 101.5);
		assert.equal(result.value, value);
		assert.equal(result.fraction, fraction);
	});
});
