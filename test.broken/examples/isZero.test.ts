import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function isZero", function () {
	it("financial.isZero(num: Financial): boolean", () => {
		const num = { value: "0", fraction: 0 };

		const result = financial.isZero(num);  // return boolean
		// console.log(result);                // true

		assert.equal(result, true);
	});
	it("financial.isZero(num: string): boolean", () => {
		const num = "2";
		const result = financial.isZero(num);   // return boolean
		// console.log(result);                 // false

		assert.equal(result, false);
	});
});
