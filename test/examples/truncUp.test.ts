import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function truncUp", function () {
	it("financial.truncUp(left: Financial, right: number): Financial", () => {
		const num = financial.parse("100.121");
		const fraction = 2;
		const result = financial.truncUp(num, fraction); // return Financial
		// console.log(result.toString());             // "100.13"
		// console.log(result.toFloat());              // 100.13

		assert.equal(financial.toString(result), "100.13");
		assert.equal(financial.toFloat(result), 100.13);
		assert.equal(result.value, "10013");
		assert.equal(result.fraction, fraction);
	});
	it("financial.truncUp(left: string, right: number): string", () => {
		const num = "200.121";
		const fraction = 2;
		const result = financial.truncUp(num, fraction); // return Financial
		// console.log(result);                        // "200.13"
		// console.log(parseFloat(result));           // 200.13

		assert.equal(result, "200.13");
		assert.equal(parseFloat(result), 200.13);
	});
});
