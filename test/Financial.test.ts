import { assert } from "chai";

import financial, { Financial } from "../src/index";

describe("Financial funtion tests", function () {
	describe("Positive tests", function () {
		it("Should be '2' + '3' = '5'", function () {
			const first = new Financial("2", 0);
			const second = new Financial("3", 0);
			const result = Financial.plus(first, second);
			assert.equal(result.toString(), "5");
		});
		it("Should be '0.5' + '0.7' = '1.2'", function () {
			const first = new Financial("5", 1);
			const second = new Financial("7", 1);
			const result = Financial.plus(first, second);
			assert.equal(result.toString(), "1.2");
		});
		it("Should be '-0.5' + '0.7' = '1.2'", function () {
			const first = new Financial("-5", 1);
			const second = new Financial("7", 1);
			const result = Financial.plus(first, second);
			assert.equal(result.toString(), "0.2");
		});
		it("Should be '0.50221199' + '0.00000001' = '0.50221200'", function () {
			const first = new Financial("50221199", 8);
			const second = new Financial("1", 8);
			const result = Financial.plus(first, second);
			assert.equal(result.toString(), "0.502212");
		});
		it("Should be '-0.50221199' + '0.00000001' = '-0.50221198'", function () {
			const first = new Financial("-50221199", 8);
			const second = new Financial("1", 8);
			const result = Financial.plus(first, second);
			assert.equal(result.toString(), "-0.50221198");
		});
		it("Should be '3' - '2' = '1'", function () {
			const first = new Financial("3", 0);
			const second = new Financial("2", 0);
			const result = Financial.minus(first, second);
			assert.equal(result.toString(), "1");
		});
		it("Should be '-3' - '2' = '-5'", function () {
			const first = new Financial("-3", 0);
			const second = new Financial("2", 0);
			const result = Financial.minus(first, second);
			assert.equal(result.toString(), "-5");
		});
		it("Should be '2' - '7' = '-5'", function () {
			const first = new Financial("2", 0);
			const second = new Financial("7", 0);
			const result = Financial.minus(first, second);
			assert.equal(result.toString(), "-5");
		});
		it("Should be '3' * '2' = '6'", function () {
			const first = new Financial("3", 0);
			const second = new Financial("2", 0);
			const result = Financial.multiply(first, second);
			assert.equal(result.toString(), "6");
		});
		it("Should be '-3' * '2' = '6'", function () {
			const first = new Financial("-3", 0);
			const second = new Financial("2", 0);
			const result = Financial.multiply(first, second);
			assert.equal(result.toString(), "-6");
		});
		it("Should be '6' / '2' = '3'", function () {
			const first = new Financial("6", 0);
			const second = new Financial("2", 0);
			const result = Financial.divide(first, second);
			assert.equal(result.toString(), "3");
		});
		it("Should be '-6' / '2' = '-3'", function () {
			const first = new Financial("-6", 0);
			const second = new Financial("2", 0);
			const result = Financial.divide(first, second);
			assert.equal(result.toString(), "-3");
		});
		it("Should be '6' / '-2' = '-3'", function () {
			const first = new Financial("6", 0);
			const second = new Financial("-2", 0);
			const result = Financial.divide(first, second);
			assert.equal(result.toString(), "-3");
		});
		it("Should plus 0.001 + 0.000001 = 0.001001", function () {
			const amount = new Financial("1", 3); // setup number 0.001
			const commission = new Financial("1", 6); // setup number 0.000001

			const sum = Financial.plus(amount, commission); // 0.001001
			assert.equal(sum.value, "1001");
			assert.equal(sum.fraction, 6);
		});
		it("Should minus 0.001 - 0.000001 = 0.000999", function () {
			const amount = new Financial("1", 3); // setup number 0.001
			const commission = new Financial("1", 6); // setup number 0.000001

			const sum = Financial.minus(amount, commission); // 0.000999
			assert.equal(sum.value, "999");
			assert.equal(sum.fraction, 6);
		});
		it("Should divide 0.001 / 0.02000000 = 0.05", function () {
			const left = new Financial("1", 3); // setup number 0.001
			const right = new Financial("2", 2); // setup number 0.02000000

			const result = Financial.divide(left, right); // 0.05
			assert.equal(result.value, "5");
			assert.equal(result.fraction, 2);
		});
		it("Should work static equals() 0.33557701", function () {
			const left = new Financial("33557701", 8);
			const right = new Financial("33557701", 8);
			const equal = Financial.equals(left, right);
			assert.isTrue(equal);
		});
		it("Should work get value() -33557701", function () {
			const fin = new Financial("-33557701", 8);
			const value = fin.value;
			assert.equal(value, "-33557701");
		});
		it("Should work get fraction() 6", function () {
			const fin = new Financial("-33557701", 6);
			const fraction = fin.fraction;
			assert.equal(fraction, 6);
		});
		it("Should normalize via factory from to 0.1000 to 1,1", function () {
			const instanceOverConstructor = financial("0.1000"); // setup number 0.1
			assert.equal(instanceOverConstructor.value, "1");
			assert.equal(instanceOverConstructor.fraction, 1);
		});
		it("Should normalize via factory from to 10.00 to 10,0", function () {
			const instanceOverConstructor = financial("10.00"); // setup number 10
			assert.equal(instanceOverConstructor.value, "10");
			assert.equal(instanceOverConstructor.fraction, 0);
		});
		it("(Bug v0.0.1) Should work toString(): 0.00157292", function () {
			const rawPrice = 0.00157292 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "157292");
			const price = new Financial(rawPriceStr, 8);
			const result = price.toString();
			assert.equal(result, "0.00157292");
		});
		it("(Bug v0.0.1) Should work toString(): 0.00000152", function () {
			const rawPrice = 0.00000152 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "152");
			const price = new Financial(rawPriceStr, 8);
			const result = price.toString();
			assert.equal(result, "0.00000152");
		});
		it("(Bug v0.0.1) Should work toString(): -0.00000152", function () {
			const rawPrice = -0.00000152 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "-152");
			const price = new Financial(rawPriceStr, 8);
			const result = price.toString();
			assert.equal(result, "-0.00000152");
		});
		it("(Bug 2.0.0) Should works same Financial constructor and financial factory", function () {
			const instanceOverConstructor = new Financial("60090", 2);
			const instanceOverFactory = financial(600.90, 2);
			assert.equal(instanceOverConstructor.value, "6009");
			assert.equal(instanceOverFactory.value, "6009");
			assert.equal(instanceOverConstructor.fraction, 1);
			assert.equal(instanceOverFactory.fraction, 1);
		});
		it("(Bug 2.0.1) Should raise error when division by zero occurs", function () {
			const first = financial(0, 0);
			const second = financial(0, 0);
			let expectedError;
			try {
				Financial.divide(first, second);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Division by zero");
		});
		it("(Bug 2.0.2) Should normalize via constructor from to 1000,4 to 1,1", function () {
			const instanceOverConstructor = new Financial("1000", 4); // setup number 0.1
			assert.equal(instanceOverConstructor.value, "1");
			assert.equal(instanceOverConstructor.fraction, 1);
		});
		it("(Bug 2.0.2) Should normalize via constructor from to 1000,2 to 10,0", function () {
			const instanceOverConstructor = new Financial("1000", 2); // setup number 10
			assert.equal(instanceOverConstructor.value, "10");
			assert.equal(instanceOverConstructor.fraction, 0);
		});
		it("(Bug 2.0.2) Should multiply 0.05 * 0.02000000 = 0.001", function () {
			const left = new Financial("5", 2); // setup number 0.05
			const right = new Financial("2", 2); // setup number 0.02000000

			const result = Financial.multiply(left, right); // 0.001
			assert.equal(result.value, "1");
			assert.equal(result.fraction, 3);
		});
	});

	describe("Negatove tests", function () {
		it("Should NOT instance with value=\"123.123.123\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial("123.123.123", 3);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with value=\"a\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial("a", 0);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with fraction=0.4", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial("123", 0.4);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with value=\"00055000\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial("00055000", 8);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
	});
});
