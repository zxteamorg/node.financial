import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function multiply", function () {
	it("financial.multiply(left: Financial, right: Financial): Financial", () => {
		const left = financial.parse("10");
		const right = financial.parse("2");
		const result = financial.multiply(left, right); // return Financial
		// console.log(result.toString());         // "20"
		// console.log(result.toFloat());          // 20

		assert.equal(financial.toString(result), "20");
		assert.equal(financial.toFloat(result), 20);
		assert.equal(result.value, "20");
		assert.equal(result.fraction, 0);
	});
	it("financial.multiply(left: string, right: string): string", () => {
		const left = "20";
		const right = "2";
		const result = financial.multiply(left, right); // return Financial
		// console.log(result);                         // "40"
		// console.log(parseFloat(result));             // 40

		assert.equal(result, "40");
		assert.equal(parseFloat(result), 40);
	});
});
