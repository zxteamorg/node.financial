import { assert } from "chai";

import { FinancialLike } from "@zxteam/contract";
import { financial } from "../src/index";

describe("Financial funtion tests", function () {
	describe("Financial funtion math action tests", function () {
		it("Should avoid approximation as number (multiply)", function () {
			const totalMoney = financial(600.90, 2);
			const pricePerItem = financial(200.30, 2);
			const buyItems = financial("3");
			const result = pricePerItem.multiply(buyItems);

			assert.isTrue(totalMoney.equalsTo(result));
			assert.equal(result.toString(), "600.9");
		});
		it("Should avoid approximation as string (multiply)", function () {
			const totalMoney = financial("600.90");
			const pricePerItem = financial("200.30");
			const buyItems = financial("3");
			const result = pricePerItem.multiply(buyItems);

			assert.isTrue(totalMoney.equalsTo(result));
			assert.equal(result.toString(), "600.9");
		});
		it("Should work not equalsTo two financial", function () {
			const first = financial("600.90");
			const second = financial("200.30");
			assert.isFalse(first.equalsTo(second));
			assert.isFalse(second.equalsTo(first));
		});
		it("Should avoid approximation as number (divide)", function () {
			const totalMoney = financial(600.90, 2);
			const pricePerItem = financial(200.30, 2);
			const buyItems = financial("3");
			const result = totalMoney.divide(buyItems);

			assert.isTrue(pricePerItem.equalsTo(result));
			assert.equal(result.toString(), "200.3");
		});
		it("Should avoid approximation as string (divide)", function () {
			const totalMoney = financial("600.90");
			const pricePerItem = financial("200.30");
			const buyItems = financial("3");
			const result = totalMoney.divide(buyItems);

			assert.isTrue(pricePerItem.equalsTo(result));
			assert.equal(result.toString(), "200.3");
		});
		it("Should avoid approximation as string (PLUS)", function () {
			const totalMoney = financial("600.90");
			const pricePerItem = financial("200.3005");

			const result = totalMoney.plus(pricePerItem);

			assert.equal(result.toString(), "801.2005");
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
			assert.equal(toString, "600.9");
		});
		it("Should avoid approximation as number (toString)", function () {
			const money = financial(600, 0);
			const toString = money.toString();
			assert.equal(toString, "600");
		});
		it("Should avoid approximation as string (toString)", function () {
			const money = financial("600.90");
			const toString = money.toString();
			assert.equal(toString, "600.9");
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
		it("Should avoid approximation as number (equalsTo)", function () {
			const percent = -6.818181818181825;
			const money = financial(percent, 8);
			assert.equal(money.toFloat(), -6.81818181);
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
		it("Should avoid approximation as string 10", function () {
			const money = financial("10");
			const numberMoney = money.toInt();
			assert.equal(numberMoney, 10);
		});
		it("Should avoid approximation as number (toInt)", function () {
			const money = financial(600, 0);
			const numberMoney = money.toInt();
			assert.equal(numberMoney, 600);
		});
		it("Should be equalsTo 1.90000000 and 1.9", function () {
			const a = financial("1.90000000");
			const b = financial("1.9");
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be equalsTo 0.00000012 and 12", function () {
			const a = financial("0.00000012");
			const b = financial(0.00000012, 8);
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be equalsTo -0.00000012 and -12", function () {
			const a = financial("-0.00000012");
			const b = financial(-0.00000012, 8);
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be equalsTo 0.00056000 as string and 0.00056000 as number", function () {
			const a = financial("0.00056000");
			const b = financial(0.00056000, 8);
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be equalsTo 0.000012 and 12", function () {
			const a = financial("0.000012");
			const b = financial(0.000012, 6);
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be equalsTo -0.000012 and -12", function () {
			const a = financial("-0.000012");
			const b = financial(-0.000012, 6);
			assert.isTrue(a.equalsTo(b));
		});
		it("Should be skip two last char 89", function () {
			const a = financial(1.9123456789, 8);
			assert.equal(a.toString(), "1.91234567");
			assert.equal(a.toFloat(), 1.91234567);
		});
		it("Should work FinancialLike value: 1000001001, fraction: 8 toString()", function () {
			const financialLike: FinancialLike = {
				value: "1000001001",
				fraction: 8
			};
			const newFinacial = financial(financialLike);
			const toString = newFinacial.toString();
			assert.equal(toString, "10.00001001");
		});
		it("Should work FinancialLike value: -1000001001, fraction: 8 toFloat()", function () {
			const financialLike: FinancialLike = {
				value: "-1000001001",
				fraction: 8
			};
			const newFinacial = financial(financialLike);
			const toFloat = newFinacial.toFloat();
			assert.equal(toFloat, -10.00001001);
		});
		it("Should work FinancialLike value: -1000001001, fraction: 8 toInt()", function () {
			const financialLike: FinancialLike = {
				value: "-1000001001",
				fraction: 8
			};
			const newFinacial = financial(financialLike);
			const toInt = newFinacial.toInt();
			assert.equal(toInt, -10);
		});
	});
});
