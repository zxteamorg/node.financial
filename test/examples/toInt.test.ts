import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function toInt", function () {
	it("financial.toInt(num: Financial): number", () => {
		const num = financial.parse("100.12");

		const result = financial.toInt(num);   // return number
		// console.log(result);                // 100

		assert.equal(result, 100);
	});
});
