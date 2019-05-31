import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function subtract", function () {
	it("financial.subtract(left: Financial, right: Financial): Financial", () => {
		const left = financial.parse("500");
		const right = financial.parse("250");
		const result = financial.subtract(left, right); // return Financial
		// console.log(result.toString());              // "250"
		// console.log(result.toFloat());               // 250

		assert.equal(financial.toString(result), "250");
		assert.equal(financial.toFloat(result), 250);
		assert.equal(result.value, "250");
		assert.equal(result.fraction, 0);
	});
	it("financial.subtract(left: string, right: string): string", () => {
		const left = "350";
		const right = "150";
		const result = financial.subtract(left, right); // return Financial
		// console.log(result);                         // "200"
		// console.log(parseFloat(result));             // 200

		assert.equal(result, "200");
		assert.equal(parseFloat(result), 200);
	});
});
