import { Financial } from "@zxteam/contract";
import { assert } from "chai";
import financial, { Fraction } from "../../src/index";

describe("Financial examples function floor", function () {

	it("financial.floor(num: string, fraction: Fraction): Financial", () => {
		// Given
		const num: Financial = { value: "100129", fraction: 3 };
		const fraction: Fraction = 2;

		// Operation
		const result = financial.floor(num, fraction);

		// Expected
		assert.isTrue(financial.isFinancial(result));
		assert.equal(result.value, "10012");
		assert.equal(result.fraction, fraction);
	});

	it("financial.floor(num: zxteam.Financial, fraction: Fraction): string", () => {
		// Given
		const num: string = "200.129";
		const fraction: Fraction = 2;

		// Operation
		const result = financial.floor(num, fraction);

		// Expected
		assert.isString(result);
		assert.equal(result, "200.12");
	});

});
