import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function toString", function () {
	it("financial.toString(num: Financial): string", () => {
		const num = financial.parse("100.12");

		const result = financial.toString(num);   // return string
		// console.log(result);                   // "100.12"

		assert.equal(result, "100.12");
	});
});
