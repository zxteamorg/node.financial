import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function toFloat", function () {
	it("financial.toFloat(num: Financial): number", () => {
		const num = financial.parse("100.12");

		const result = financial.toFloat(num);   // return number
		// console.log(result);                  // 100.12

		assert.equal(result, 100.12);
	});
});
