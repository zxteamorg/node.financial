import { Financial } from "@zxteam/contract";
import { assert } from "chai";
import financial from "../../src/index";
import { Fraction } from "../../src/Fraction";

describe("Financial examples function ceil", function () {

	it("financial.ceil(num: string, fraction: Fraction): Financial", () => {
		// Given
		const num: Financial = { value: "100121", fraction: 3 };
		const fraction: Fraction = 2;

		// Operation
		const result = financial.ceil(num, fraction);

		// Expected
		assert.isTrue(financial.isFinancial(result));
		assert.equal(result.value, "10013");
		assert.equal(result.fraction, fraction);
	});

	it("financial.ceil(num: zxteam.Financial, fraction: Fraction): string", () => {
		// Given
		const num: string = "100.121";
		const fraction: Fraction = 2;

		// Operation
		const result = financial.ceil(num, fraction);

		// Expected
		assert.isString(result);
		assert.equal(result, "200.13");
	});

});
