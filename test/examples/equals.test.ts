import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function equals", function () {
	it("financial.equals(left: Financial, right: Financial): boolean", () => {
		const left = financial.parse("200.3");
		const right = financial.parse("600.5");
		const result = financial.equals(left, right); // return boolean
		// console.log(result);                       // false

		assert.equal(result, false);
	});
	it("financial.equals(left: string, right: string): boolean", () => {
		const left = "200.3";
		const right = "600.5";
		const result = financial.equals(left, right); // return boolean
		// console.log(result);                       // false

		assert.equal(result, false);
	});
});
