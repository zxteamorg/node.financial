import { assert } from "chai";

import { financial } from "../src/index";

describe("Financial funtion tests", function () {
	describe("Financial funtion math action tests", function () {
		it("Should avoid approximation as number (multiply)", function () {
			const totalMoney = financial(600.90, 2);
			const pricePerItem = financial(200.30, 2);
			const buyItems = financial("3");
			const result = pricePerItem.multiply(buyItems);

			assert.isTrue(totalMoney.equalsTo(result));
			assert.equal(result.toString(), "600.90");
		});
		it("Should avoid approximation as string (multiply)", function () {
			const totalMoney = financial("600.90");
			const pricePerItem = financial("200.30");
			const buyItems = financial("3");
			const result = pricePerItem.multiply(buyItems);

			assert.isTrue(totalMoney.equalsTo(result));
			assert.equal(result.toString(), "600.90");
		});
		it("Should avoid approximation as number (divide)", function () {
			const totalMoney = financial(600.90, 2);
			const pricePerItem = financial(200.30, 2);
			const buyItems = financial("3");
			const result = totalMoney.divide(buyItems);

			assert.isTrue(pricePerItem.equalsTo(result));
			assert.equal(result.toString(), "200.30");
		});
		it("Should avoid approximation as string (divide)", function () {
			const totalMoney = financial("600.90");
			const pricePerItem = financial("200.30");
			const buyItems = financial("3");
			const result = totalMoney.divide(buyItems);

			assert.isTrue(pricePerItem.equalsTo(result));
			assert.equal(result.toString(), "200.30");
		});
		it.skip("Should avoid digits limit (plus)", function () {
			const first = financial("123456789012345678901234567890");
			const second = financial("1");
			const result = first.plus(second);
			assert.equal(result.toString(), "123456789012345678901234567891");
		});
		it.skip("Should avoid digits limit (minus)", function () {
			const first = financial("123456789012345678901234567890");
			const second = financial("1");
			const result = first.minus(second);
			assert.equal(result.toString(), "123456789012345678901234567889");
		});
	});
	describe("Financial funtion converting tests", function () {
		it("Should avoid approximation as number (toString)", function () {
			const money = financial(600.90, 2);
			const toString = money.toString();
			assert.equal(toString, "600.90");
		});
		it("Should avoid approximation as number (toString)", function () {
			const money = financial(600, 0);
			const toString = money.toString();
			assert.equal(toString, "600");
		});
		it("Should avoid approximation as string (toString)", function () {
			const money = financial("600.90");
			const toString = money.toString();
			assert.equal(toString, "600.90");
		});
		it("Should avoid approximation as number (equalsTo)", function () {
			const money = financial(600.90, 2);
			const someMoney = financial(600.90, 2);
			assert.isTrue(money.equalsTo(someMoney));
			assert.isTrue(someMoney.equalsTo(money));
		});
		it("Should avoid approximation as string and number (equalsTo)", function () {
			const money = financial("600.90");
			const someMoney = financial(600.90, 2);
			assert.isTrue(money.equalsTo(someMoney));
			assert.isTrue(someMoney.equalsTo(money));
		});
		it("Should avoid approximation as string (equalsTo)", function () {
			const money = financial("600.90");
			const someMoney = financial("600.90");
			assert.isTrue(money.equalsTo(someMoney));
			assert.isTrue(someMoney.equalsTo(money));
		});
		it("Should avoid approximation as number (toFloat)", function () {
			const money = financial(600.90, 2);
			const numberMoney = money.toFloat();
			assert.equal(numberMoney, 600.90);
		});
		it("Should avoid approximation as string (toFloat)", function () {
			const money = financial("600.90");
			const numberMoney = money.toFloat();
			assert.equal(numberMoney, 600.90);
		});
		it("Should avoid approximation as string (toInt)", function () {
			const money = financial("600");
			const numberMoney = money.toInt();
			assert.equal(numberMoney, 600);
		});
		it("Should avoid approximation as number (toInt)", function () {
			const money = financial(600, 0);
			const numberMoney = money.toInt();
			assert.equal(numberMoney, 600);
		});
	});
});
