import { assert } from "chai";
import financial from "../../src/index";

describe("Financial examples function fromFloat", function () {
	it("financial.fromFloat(value: number, fractionDigits: number): Financial", () => {
		const value = 150.55;
		const fractionDigits = 2;
		const result = financial.fromFloat(value, fractionDigits); // return Financial
		// console.log(result.toString());                         // "150.55"
		// console.log(result.toFloat());                          // 150.55

		assert.equal(financial.toString(result), "150.55");
		assert.equal(financial.toFloat(result), value);
		assert.equal(result.value, "15055");
		assert.equal(result.fraction, fractionDigits);
	});
});
