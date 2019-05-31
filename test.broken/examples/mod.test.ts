import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function mod", function () {
	it("financial.mod(left: Financial, right: Financial): Financial", () => {
		const left = financial.parse("8");
		const right = financial.parse("3");
		const result = financial.mod(left, right); // return Financial
		// console.log(result.toString());         // "2"
		// console.log(result.toFloat());          // 2

		assert.equal(financial.toString(result), "2");
		assert.equal(financial.toFloat(result), 2);
		assert.equal(result.value, "2");
		assert.equal(result.fraction, 0);
	});
	it("financial.mod(left: string, right: string): string", () => {
		const left = "11";
		const right = "2";
		const result = financial.mod(left, right); // return Financial
		// console.log(result);                    // "1"
		// console.log(parseFloat(result));        // 1

		assert.equal(result, "1");
		assert.equal(parseFloat(result), 1);
	});
});
