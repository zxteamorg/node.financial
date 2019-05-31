import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function lt", function () {
	it("financial.lt(left: Financial, right: Financial): boolean", () => {
		const left = financial.parse("200.3");
		const right = financial.parse("600.5");
		const result = financial.lt(left, right); // return boolean
		// console.log(result);                   // true

		assert.equal(result, true);
	});
	it("financial.lt(left: string, right: string): boolean", () => {
		const left = "200.3";
		const right = "600.5";
		const result = financial.lt(left, right); // return boolean
		// console.log(result);                   // true

		assert.equal(result, true);
	});
});
