import { assert } from "chai";

import { financial } from "../src/index";

describe("financial funtion tests", function () {
	it("Should avoid approximation (multiply)", function () {
		const totalMoney = financial(600.90, 2);
		const pricePerItem = financial(200.30, 2);
		const buyItems = financial(3);
		const result = pricePerItem.multiply(buyItems);

		assert.isTrue(totalMoney.equalsTo(result));
		assert.equal(result.toString(), "600.90");
	});
	it("Should avoid approximation (divide)", function () {
		const totalMoney = financial(600.90, 2);
		const pricePerItem = financial(200.30, 2);
		const buyItems = financial(3);
		const result = totalMoney.divide(buyItems);

		assert.isTrue(pricePerItem.equalsTo(result));
		assert.equal(result.toString(), "200.30");
	});
	it("Should avoid digits limit (plus)", function () {
		const first = financial("123456789012345678901234567890");
		const second = financial("1");
		const result = first.plus(second);
		assert.equal(result.toString(), "123456789012345678901234567891");
	});
	it("Should avoid digits limit (minus)", function () {
		const first = financial("123456789012345678901234567890");
		const second = financial("1");
		const result = first.minus(second);
		assert.equal(result.toString(), "123456789012345678901234567889");
	});
});
