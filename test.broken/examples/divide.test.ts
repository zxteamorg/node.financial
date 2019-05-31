import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function divide", function () {
	it("financial.divide(left: Financial, right: Financial): Financial", () => {
		const left = financial.parse("100");
		const right = financial.parse("10");
		const result = financial.divide(left, right); // return Financial
		// console.log(result.toString());            // "10"
		// console.log(result.toFloat());             // 10

		assert.equal(financial.toString(result), "10");
		assert.equal(financial.toFloat(result), 10);
		assert.equal(result.value, "10");
		assert.equal(result.fraction, 0);
	});
	it("financial.divide(left: string, right: string): string", () => {
		const left = "200";
		const right = "2";
		const result = financial.divide(left, right); // return Financial
		// console.log(result);                       // "100"
		// console.log(parseFloat(result));           // 100

		assert.equal(result, "100");
		assert.equal(parseFloat(result), 100);
	});
});
