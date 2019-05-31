import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function gt", function () {
	it("financial.gt(left: Financial, right: Financial): boolean", () => {
		const left = financial.parse("200.3");
		const right = financial.parse("600.5");
		const result = financial.gt(left, right); // return boolean
		// console.log(result);                   // false

		assert.equal(result, false);
	});
	it("financial.gt(left: string, right: string): boolean", () => {
		const left = "200.3";
		const right = "600.5";
		const result = financial.gt(left, right); // return boolean
		// console.log(result);                   // false

		assert.equal(result, false);
	});
});
