import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function isFinancial", function () {
	it("financial.isFinancial(probablyFinancal: any): probablyFinancal is Financial", () => {
		const financialLike = { value: "5", fraction: 0 };

		const result = financial.isFinancial(financialLike);  // return boolean
		// console.log(result);                               // true

		assert.equal(result, true);
	});
	it("financial.isFinancial(probablyFinancal: any): probablyFinancal is Financial", () => {
		const financialFake = {};
		const result = financial.isFinancial(financialFake);   // return boolean
		// console.log(result);                                // false

		assert.equal(result, false);
	});
});
