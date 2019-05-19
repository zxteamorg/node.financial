import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function add", function () {
	it("financial.add(left: Financial, right: Financial): Financial", () => {
		const left = financial.parse("200.3");
		const right = financial.parse("600.5");
		const result = financial.add(left, right); // return Financial
		// console.log(result.toString());         // "800.8"
		// console.log(result.toFloat());          // 800.8

		assert.equal(financial.toString(result), "800.8");
		assert.equal(financial.toFloat(result), 800.8);
		assert.equal(result.value, "8008");
		assert.equal(result.fraction, 1);
	});
	it("financial.add(left: string, right: string): string", () => {
		const left = "200.3";
		const right = "600.5";
		const result = financial.add(left, right); // return Financial
		// console.log(result);                    // "800.8"
		// console.log(parseFloat(result));        // 800.8

		assert.equal(result, "800.8");
		assert.equal(parseFloat(result), 800.8);
	});
});
