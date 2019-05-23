import { assert } from "chai";

import { Financial as FinancialLike } from "@zxteam/contract";
import { Financial, FinancialSettings, DEFAULT_SETTINGS } from "../src/index";

const settings: FinancialSettings = DEFAULT_SETTINGS;

describe("Financial examples funtion tests", function () {
	it("Financial.add(left, right)", () => {
		const left = Financial.parse(settings, "200.3");
		const right = Financial.parse(settings, "600.5");
		const result = Financial.add(left, right); // return Financial
		// console.log(result.toString());            // "800.8"
		// console.log(result.toFloat());             // 800.8

		assert.equal(Financial.toString(settings, result), "800.8");
		assert.equal(Financial.toFloat(result), 800.8);
		assert.equal(result.value, "8008");
		assert.equal(result.fraction, 1);
	});
	it("Financial.equals(left, right)", () => {
		const left = Financial.parse(settings, "200.3");
		const right = Financial.parse(settings, "600.5");
		const result = Financial.equals(left, right); // return boolean
		// console.log(result);                        // false

		assert.equal(result, false);
	});
	it("Financial.fromFloat(value, fractionDigits)", () => {
		const value = 150.55;
		const fraction = 2;
		const simpleFinancial = Financial.fromFloat(value, fraction);
		// console.log(simpleFinancial.toString());  // "150.55"
		// console.log(simpleFinancial.toFloat());  // 150.55

		assert.equal(simpleFinancial.value, "15055");
		assert.equal(simpleFinancial.fraction, fraction);
		assert.equal(Financial.toString(settings, simpleFinancial), value.toString());
		assert.equal(Financial.toFloat(simpleFinancial), value);
	});
	it("Financial.fromInt(value)", () => {
		const value = 42;
		const simpleFinancial = Financial.fromInt(value);
		// console.log(simpleFinancial.toString()); // "42"
		// console.log(simpleFinancial.toInt());    // 42

		assert.equal(simpleFinancial.value, "42");
		assert.equal(simpleFinancial.fraction, 0);
		assert.equal(Financial.toString(settings, simpleFinancial), value.toString());
		assert.equal(Financial.toFloat(simpleFinancial), value);
	});
	it("Financial.fromString(value)", () => {
		const value = "101.5";
		const simpleFinancial = Financial.parse(settings, value);
		// console.log(simpleFinancial.toString());   // "101.5"
		// console.log(simpleFinancial.toFloat());    // 101.5

		assert.equal(simpleFinancial.value, "1015");
		assert.equal(simpleFinancial.fraction, 1);
		assert.equal(Financial.toString(settings, simpleFinancial), value);
		assert.equal(Financial.toFloat(simpleFinancial), parseFloat(value));
	});
	it("Financial.gt(left, right)", () => {
		const left = Financial.parse(settings, "200.3");
		const right = Financial.parse(settings, "600.5");
		const result = Financial.gt(left, right); // left > right = false
		// console.log(result);                   // false

		assert.equal(result, false);
	});
	it("Financial.gte(left, right)", () => {
		const left = Financial.parse(settings, "200.3");
		const right = Financial.parse(settings, "600.5");
		const result = Financial.gte(left, right); // left >= right = false
		// console.log(result);                    // false

		assert.equal(result, false);
	});
	it("Financial.isZero(num)", () => {
		const zero = { value: "0", fraction: 0 };
		const isZero = Financial.isZero(zero);
		// console.log(isZero); // true

		assert.equal(isZero, true);
	});
	it("Financial.mod(left, right)", () => {
		const left = Financial.parse(settings, "200.3");
		const right = Financial.parse(settings, "600.5");
		const remainder = Financial.mod(left, right);
		console.log(remainder); //
		Financial.toString(settings, remainder);
	});
});

describe("Financial funtion tests", function () {
	describe("Financial funtion math action tests", function () {
		it("Should avoid approximation as number (multiply)", function () {
			const totalMoney = Financial.fromFloat(600.90, 2);
			const pricePerItem = Financial.fromFloat(200.30, 2);
			const buyItems = Financial.parse(settings, "3");
			const result = Financial.multiply(pricePerItem, buyItems);

			assert.isTrue(Financial.equals(totalMoney, result));
			assert.equal(Financial.toString(settings, result), "600.9");
		});
		it("Should avoid approximation as string (multiply)", function () {
			const totalMoney = Financial.parse(settings, "600.90");
			const pricePerItem = Financial.parse(settings, "200.30");
			const buyItems = Financial.parse(settings, "3");
			const result = Financial.multiply(pricePerItem, buyItems);

			assert.isTrue(Financial.equals(totalMoney, result));
			assert.equal(Financial.toString(settings, result), "600.9");
		});
		it("Should work not equalsTo two financial", function () {
			const first = Financial.parse(settings, "600.90");
			const second = Financial.parse(settings, "200.30");
			assert.isFalse(Financial.equals(first, second));
		});
		it("Should avoid approximation as number (divide)", function () {
			const totalMoney = Financial.fromFloat(600.90, 2);
			const pricePerItem = Financial.fromFloat(200.30, 2);
			const buyItems = Financial.parse(settings, "3");
			const result = Financial.divide(settings, totalMoney, buyItems);

			assert.isTrue(Financial.equals(pricePerItem, result));
			assert.equal(Financial.toString(settings, result), "200.3");
		});
		it("Should avoid approximation as string (divide)", function () {
			const totalMoney = Financial.parse(settings, "600.90");
			const pricePerItem = Financial.parse(settings, "200.30");
			const buyItems = Financial.parse(settings, "3");
			const result = Financial.divide(settings, totalMoney, buyItems);

			assert.isTrue(Financial.equals(pricePerItem, result));
			assert.equal(Financial.toString(settings, result), "200.3");
		});
		it("Should avoid approximation as string (PLUS)", function () {
			const totalMoney = Financial.parse(settings, "600.90");
			const pricePerItem = Financial.parse(settings, "200.3005");

			const result = Financial.add(totalMoney, pricePerItem);

			assert.equal(Financial.toString(settings, result), "801.2005");
		});
		it("Should avoid digits limit (plus)", function () {
			const first = Financial.parse(settings, "123456789012345678901234567890");
			const second = Financial.parse(settings, "1");
			const result = Financial.add(first, second);
			assert.equal(Financial.toString(settings, result), "123456789012345678901234567891");
		});
		it("Should avoid digits limit and fraction (plus)", function () {
			const first = Financial.parse(settings, "123456789012345678901234567890.01");
			const second = Financial.parse(settings, "1.002");
			const result = Financial.add(first, second);
			assert.equal(result.value, "123456789012345678901234567891012");
			assert.equal(result.fraction, 3);
		});
		it("Should avoid digits limit (minus)", function () {
			const first = Financial.parse(settings, "123456789012345678901234567890");
			const second = Financial.parse(settings, "1");
			const result = Financial.subtract(first, second);
			assert.equal(Financial.toString(settings, result), "123456789012345678901234567889");
		});
		it("Should avoid digits limit and fraction (minus)", function () {
			const first = Financial.parse(settings, "123456789012345678901234567890.01");
			const second = Financial.parse(settings, "1.001");
			const result = Financial.subtract(first, second);
			assert.equal(result.value, "123456789012345678901234567889009");
			assert.equal(result.fraction, 3);
		});
	});
	describe("Financial funtion converting tests", function () {
		it("Should avoid approximation as number (toString)", function () {
			const money = Financial.fromFloat(600.90, 2);
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "600.9");
		});
		it("Should avoid approximation as number (toString)", function () {
			const money = Financial.fromFloat(600, 0);
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "600");
		});
		it("Should avoid approximation as string (toString)", function () {
			const money = Financial.parse(settings, "600.90");
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "600.9");
		});
		it("Should avoid approximation as number (equalsTo)", function () {
			const money = Financial.fromFloat(600.90, 2);
			const someMoney = Financial.fromFloat(600.90, 2);
			assert.isTrue(Financial.equals(money, someMoney));
			assert.isTrue(Financial.equals(someMoney, money));
		});
		it("Should avoid approximation as string and number (equalsTo)", function () {
			const money = Financial.parse(settings, "600.90");
			const someMoney = Financial.fromFloat(600.90, 2);
			assert.isTrue(Financial.equals(money, someMoney));
		});
		it("Should avoid approximation as string (equalsTo)", function () {
			const money = Financial.parse(settings, "600.90");
			const someMoney = Financial.parse(settings, "600.90");
			assert.isTrue(Financial.equals(money, someMoney));
		});
		it("Should avoid approximation as number (equalsTo)", function () {
			const percent = -6.818181818181825;
			const money = Financial.fromFloat(percent, 8);
			assert.equal(Financial.toFloat(money), -6.81818182);
		});
		it("Should avoid approximation as number (toFloat)", function () {
			const money = Financial.fromFloat(600.90, 2);
			const numberMoney = Financial.toFloat(money);
			assert.equal(numberMoney, 600.90);
		});
		it("Should avoid approximation as string (toFloat)", function () {
			const money = Financial.parse(settings, "600.90");
			const numberMoney = Financial.toFloat(money);
			assert.equal(numberMoney, 600.90);
		});
		it("Should avoid approximation as string (toInt)", function () {
			const money = Financial.parse(settings, "600");
			const numberMoney = Financial.toInt(settings, money);
			assert.equal(numberMoney, 600);
		});
		it("Should avoid approximation as string 10", function () {
			const money = Financial.parse(settings, "10");
			const numberMoney = Financial.toInt(settings, money);
			assert.equal(numberMoney, 10);
		});
		it("Should avoid approximation as number (toInt)", function () {
			const money = Financial.fromFloat(600, 0);
			const numberMoney = Financial.toInt(settings, money);
			assert.equal(numberMoney, 600);
		});
		it("Should be equalsTo 1.90000000 and 1.9", function () {
			const a = Financial.parse(settings, "1.90000000");
			const b = Financial.parse(settings, "1.9");
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be equalsTo 0.00000012 and 12", function () {
			const a = Financial.parse(settings, "0.00000012");
			const b = Financial.fromFloat(0.00000012, 8);
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be equalsTo -0.00000012 and -12", function () {
			const a = Financial.parse(settings, "-0.00000012");
			const b = Financial.fromFloat(-0.00000012, 8);
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be equalsTo 0.00056000 as string and 0.00056000 as number", function () {
			const a = Financial.parse(settings, "0.00056000");
			const b = Financial.fromFloat(0.00056000, 8);
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be equalsTo 0.000012 and 12", function () {
			const a = Financial.parse(settings, "0.000012");
			const b = Financial.fromFloat(0.000012, 6);
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be equalsTo -0.000012 and -12", function () {
			const a = Financial.parse(settings, "-0.000012");
			const b = Financial.fromFloat(-0.000012, 6);
			assert.isTrue(Financial.equals(a, b));
		});
		it("Should be skip two last char 89", function () {
			const a = Financial.fromFloat(1.9123456789, 8);
			assert.equal(Financial.toString(settings, a), "1.91234568");
			assert.equal(Financial.toFloat(a), 1.91234568);
		});
		it("Should work FinancialLike value: 1000001001, fraction: 8 toString()", function () {
			const financialLike: FinancialLike = {
				value: "1000001001",
				fraction: 8
			};
			const newFinacial = Financial.wrap(financialLike);
			const toString = Financial.toString(settings, newFinacial);
			assert.equal(toString, "10.00001001");
		});
		it("Should work FinancialLike value: -1000001001, fraction: 8 toFloat()", function () {
			const financialLike: FinancialLike = {
				value: "-1000001001",
				fraction: 8
			};
			const newFinacial = Financial.wrap(financialLike);
			const toFloat = Financial.toFloat(newFinacial);
			assert.equal(toFloat, -10.00001001);
		});
		it("Should work FinancialLike value: -1000001001, fraction: 8 toInt()", function () {
			const financialLike: FinancialLike = {
				value: "-1000001001",
				fraction: 8
			};
			const newFinacial = Financial.wrap(financialLike);
			const toInt = Financial.toInt(settings, newFinacial);
			assert.equal(toInt, -10);
		});
		it("Should work Financial value: 0.00008328, fraction: 8", function () {
			const right = new Financial("8328", 8); // setup number 0.00008328

			assert.equal(Financial.toFloat(right), 0.00008328);
			assert.equal(Financial.toInt(settings, right), 0);
		});
	});
});
