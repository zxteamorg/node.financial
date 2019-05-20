import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function truncDown", function () {
	it("financial.truncDown(left: Financial, right: number): Financial", () => {
		const num = financial.parse("100.129");
		const fraction = 2;
		const result = financial.truncDown(num, fraction); // return Financial
		// console.log(result.toString());             // "100.12"
		// console.log(result.toFloat());              // 100.12

		assert.equal(financial.toString(result), "100.12");
		assert.equal(financial.toFloat(result), 100.12);
		assert.equal(result.value, "10012");
		assert.equal(result.fraction, fraction);
	});
	it("financial.truncDown(left: string, right: number): string", () => {
		const num = "200.129";
		const fraction = 2;
		const result = financial.truncDown(num, fraction); // return Financial
		// console.log(result);                        // "200.12"
		// console.log(parseFloat(result));           // 200.12

		assert.equal(result, "200.12");
		assert.equal(parseFloat(result), 200.12);
	});
});
