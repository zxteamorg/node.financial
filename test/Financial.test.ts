import * as zxteam from "@zxteam/contract";

import { assert } from "chai";
import financial, { DEFAULT_SETTINGS } from "../src/index";
import { Settings } from "../src/contract";
import { FinancialLegacy as Financial } from "../src/impl/FinancialLegacy";

const settings: Settings = {
	backend: "string",
	decimalSeparator: ".",
	arithmeticMaxFractionalDigits: 8,
	arithmeticRoundMode: zxteam.Financial.RoundMode.Round
};

interface TestCases {
	fromFloat: Array<[[number, number], [string, number]]>;
	fromInt: Array<[number, string]>;
	multiply: Array<[zxteam.Financial, zxteam.Financial, [string, number]]>;
	divide: Array<[zxteam.Financial, zxteam.Financial, [string, number]]>;
	parse: Array<[string, [string, number]]>;
	round: Array<[zxteam.Financial, number, zxteam.Financial]>;
	truncDown: Array<[zxteam.Financial, number, zxteam.Financial]>;
	truncUp: Array<[zxteam.Financial, number, zxteam.Financial]>;
	gt: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
	lt: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
	gte: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
	lte: Array<[zxteam.Financial, zxteam.Financial, boolean]>;
	mod: Array<[zxteam.Financial, zxteam.Financial, zxteam.Financial]>;
}

// const positiveTestCases: TestCases = {
// 	fromFloat: [
// 		[[0.000999, 6], ["999", 6]],
// 		[[0.00000001, 8], ["1", 8]],
// 		[[-0.5, 1], ["-5", 1]],
// 		[[1001, 0], ["1001", 0]],
// 		[[10010, 0], ["10010", 0]],
// 		[[-999, 0], ["-999", 0]],
// 		[[1001.101, 3], ["1001101", 3]]
// 	],
// 	fromInt: [
// 		[999, "999"],
// 		[10010, "10010"]
// 	],
// 	multiply: [
// 		[{ value: "123456789012345123456789012345", fraction: 15 }, { value: "-2", fraction: 0 }, ["-24691357802469024691357802469", 14]],
// 		[{ value: "42", fraction: 0 }, { value: "-1", fraction: 0 }, ["-42", 0]],
// 		[{ value: "42", fraction: 0 }, { value: "-2", fraction: 0 }, ["-84", 0]],
// 		[{ value: "-42", fraction: 0 }, { value: "-2", fraction: 0 }, ["84", 0]],
// 		[{ value: "4212345678", fraction: 8 }, { value: "-1", fraction: 0 }, ["-4212345678", 8]]
// 	],
// 	divide: [
// 		[{ value: "13330001", fraction: 4 }, { value: "21000001", fraction: 6 }, ["6347619221", 8]],
// 		[{ value: "1333", fraction: 0 }, { value: "21", fraction: 0 }, ["6347619048", 8]],
// 		[{ value: "123456789012345123456789012345", fraction: 0 }, { value: "212345678", fraction: 0 }, ["58139534637641705830616911517", 8]],
// 		// Test-case from CoinGet: 24.2644184325 BTC need to divive to BCN price 0.00000017 should be equal 142731873.1323529482 BCN
// 		[{ value: "242644184325", fraction: 10 }, { value: "17", fraction: 8 }, ["1427318731323529482", 10]],
// 		// Test-case from CoinGet: 0 BTC need to divide to BCN price 0.00000017 should be equal 0.0
// 		[{ value: "0", fraction: 0 }, { value: "17", fraction: 8 }, ["0", 0]],
// 		[{ value: "11230707245", fraction: 9 }, { value: "1", fraction: 0 }, ["11230707245", 9]],
// 		[{ value: "1333", fraction: 0 }, { value: "210001", fraction: 4 }, ["6347588821", 8]]
// 	],
// 	parse: [
// 		["0.000999", ["999", 6]],
// 		["0.00000001", ["1", 8]],
// 		["-0.5", ["-5", 1]],
// 		["1001", ["1001", 0]],
// 		["10010", ["10010", 0]],
// 		["-999", ["-999", 0]],
// 		["1001.1010000", ["1001101", 3]]
// 	],
// 	round: [
// 		[{ value: "1559", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "1555", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "1554", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "1551", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "3", fraction: 1 }, 1, { value: "3", fraction: 1 }],
// 		[{ value: "3", fraction: 1 }, 3, { value: "3", fraction: 1 }],
// 		[{ value: "-83475643", fraction: 8 }, 5, { value: "-83476", fraction: 5 }],
// 		[{ value: "1759", fraction: 3 }, 0, { value: "2", fraction: 0 }],
// 		[{ value: "1759", fraction: 3 }, 8, { value: "1759", fraction: 3 }],
// 		[{ value: "15012341", fraction: 5 }, 4, { value: "1501234", fraction: 4 }],
// 		[{ value: "1427318731323529482", fraction: 10 }, 10, { value: "1427318731323529482", fraction: 10 }],
// 		[{ value: "14273187313235", fraction: 5 }, 5, { value: "14273187313235", fraction: 5 }]
// 	],
// 	truncDown: [
// 		[{ value: "1559", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "1555", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "1554", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "1551", fraction: 3 }, 2, { value: "155", fraction: 2 }],
// 		[{ value: "-83475643", fraction: 8 }, 5, { value: "-83476", fraction: 5 }],
// 		[{ value: "1859", fraction: 3 }, 0, { value: "1", fraction: 0 }],
// 		[{ value: "1759", fraction: 3 }, 8, { value: "1759", fraction: 3 }]
// 	],
// 	truncUp: [
// 		[{ value: "1559", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "1555", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "1554", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "1551", fraction: 3 }, 2, { value: "156", fraction: 2 }],
// 		[{ value: "-83475643", fraction: 8 }, 5, { value: "-83475", fraction: 5 }],
// 		[{ value: "1259", fraction: 3 }, 0, { value: "2", fraction: 0 }],
// 		[{ value: "1759", fraction: 3 }, 8, { value: "1759", fraction: 3 }]
// 	],
// 	gt: [
// 		[{ value: "6009", fraction: 1 }, { value: "6009", fraction: 1 }, false],
// 		[{ value: "6", fraction: 0 }, { value: "-2", fraction: 0 }, true],
// 		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, true],
// 		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, true],
// 		[{ value: "6", fraction: 0 }, { value: "105", fraction: 1 }, false],
// 		[{ value: "1", fraction: 7 }, { value: "3", fraction: 8 }, true],
// 		[{ value: "-1", fraction: 7 }, { value: "3", fraction: 8 }, false],
// 		[{ value: "-100002", fraction: 0 }, { value: "-100001", fraction: 0 }, false],
// 		[{ value: "3", fraction: 5 }, { value: "3", fraction: 5 }, false],
// 		[{ value: "6", fraction: 0 }, { value: "8", fraction: 0 }, false]
// 	],
// 	lt: [
// 		[{ value: "6", fraction: 0 }, { value: "-2", fraction: 0 }, false],
// 		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, false],
// 		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, false],
// 		[{ value: "6", fraction: 0 }, { value: "105", fraction: 1 }, true],
// 		[{ value: "1", fraction: 7 }, { value: "3", fraction: 8 }, false],
// 		[{ value: "-1", fraction: 7 }, { value: "3", fraction: 8 }, true],
// 		[{ value: "-100002", fraction: 0 }, { value: "-100001", fraction: 0 }, true],
// 		[{ value: "3", fraction: 5 }, { value: "3", fraction: 5 }, false],
// 		[{ value: "6", fraction: 0 }, { value: "8", fraction: 0 }, true]
// 	],
// 	gte: [
// 		[{ value: "6", fraction: 0 }, { value: "6", fraction: 0 }, true],
// 		[{ value: "6", fraction: 0 }, { value: "3", fraction: 0 }, true],
// 		[{ value: "6", fraction: 0 }, { value: "123", fraction: 0 }, false],
// 		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, true],
// 		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, true],
// 		[{ value: "-10002", fraction: 0 }, { value: "-10002", fraction: 0 }, true],
// 		[{ value: "-10002", fraction: 0 }, { value: "-10003", fraction: 0 }, true],
// 		[{ value: "0", fraction: 0 }, { value: "0", fraction: 0 }, true],
// 		[{ value: "1", fraction: 5 }, { value: "-1", fraction: 5 }, true],
// 		[{ value: "3", fraction: 1 }, { value: "3", fraction: 1 }, true]
// 	],
// 	lte: [
// 		[{ value: "6", fraction: 0 }, { value: "6", fraction: 0 }, true],
// 		[{ value: "6", fraction: 0 }, { value: "3", fraction: 0 }, false],
// 		[{ value: "59834567234", fraction: 8 }, { value: "34623451678", fraction: 8 }, false],
// 		[{ value: "34567234", fraction: 8 }, { value: "23451678", fraction: 8 }, false],
// 		[{ value: "6", fraction: 0 }, { value: "123", fraction: 0 }, true],
// 		[{ value: "-10002", fraction: 0 }, { value: "-10002", fraction: 0 }, true],
// 		[{ value: "-10002", fraction: 0 }, { value: "-10003", fraction: 0 }, false],
// 		[{ value: "0", fraction: 0 }, { value: "0", fraction: 0 }, true],
// 		[{ value: "1", fraction: 5 }, { value: "-1", fraction: 5 }, false],
// 		[{ value: "3", fraction: 1 }, { value: "3", fraction: 1 }, true]
// 	],
// 	mod: [
// 		[{ value: "10", fraction: 0 }, { value: "3", fraction: 0 }, { value: "1", fraction: 0 }],
// 		[{ value: "9", fraction: 0 }, { value: "3", fraction: 0 }, { value: "0", fraction: 0 }],
// 		[{ value: "10123", fraction: 3 }, { value: "3", fraction: 0 }, { value: "1123", fraction: 3 }],
// 		[{ value: "60090", fraction: 2 }, { value: "30030", fraction: 2 }, { value: "3", fraction: 1 }],
// 		[{ value: "0", fraction: 0 }, { value: "333", fraction: 1 }, { value: "0", fraction: 0 }],
// 		[{ value: "-10", fraction: 0 }, { value: "3", fraction: 1 }, { value: "-1", fraction: 1 }],
// 		[{ value: "1", fraction: 0 }, { value: "3", fraction: 0 }, { value: "1", fraction: 0 }],
// 		[{ value: "34512334485", fraction: 8 }, { value: "33225516", fraction: 8 }, { value: "24248877", fraction: 8 }]
// 	]
// };

describe("Financial funtion tests", function () {
	// describe("FinancialOperation tests", function () {
	// 	describe("subtract()", function () {
	// 		const positiveStrings = [
	// 			["5", "3", "2"]
	// 		];
	// 		const positiveFinancials = [
	// 			[{ value: "5", fraction: 0 }, { value: "3", fraction: 0 }, { value: "2", fraction: 0 }]
	// 		];

	// 		positiveStrings.forEach((positiveString) => {
	// 			const [left, right, expectedResult] = positiveString;
	// 			it(`Should be ${left} + ${right} = ${expectedResult}`, function () {
	// 				const result = financial.subtract(left, right);
	// 				assert.equal(result, expectedResult);
	// 			});
	// 		});

	// 		positiveFinancials.forEach((positiveFinancial) => {
	// 			const [left, right, expectedResult] = positiveFinancial;
	// 			it(`Should be '${JSON.stringify(left)}' + '${JSON.stringify(right)}' = '${JSON.stringify(expectedResult)}'`, function () {
	// 				const result = financial.subtract(left, right);
	// 				assert.deepEqual(result, expectedResult);
	// 			});
	// 		});
	// 	});
	// });

	// describe("Positive Test Cases", function () {
	// 	describe("floor", function () {
	// 		positiveTestCases.truncDown.forEach(truncDownCase => {
	// 			const [input, newFraction, expectedResult] = truncDownCase;
	// 			it(`Should floor financial "${JSON.stringify(input)}" for new fraction ${newFraction} to value:"${JSON.stringify(expectedResult)}"`,
	// 				function () {
	// 					const result = Financial.floor(settings, input, newFraction);
	// 					assert.equal(result.value, expectedResult.value);
	// 					assert.equal(result.fraction, expectedResult.fraction);
	// 				});
	// 		});
	// 	});
	// 	describe("ceil", function () {
	// 		positiveTestCases.truncUp.forEach(truncUpCase => {
	// 			const [input, newFraction, expectedResult] = truncUpCase;
	// 			it(`Should ceil financial "${JSON.stringify(input)}" for new fraction ${newFraction} to value:"${JSON.stringify(expectedResult)}"`,
	// 				function () {
	// 					const result = Financial.ceil(settings, input, newFraction);
	// 					assert.equal(result.value, expectedResult.value);
	// 					assert.equal(result.fraction, expectedResult.fraction);
	// 				});
	// 		});
	// 	});
	// });

	describe("Positive tests", function () {
		it("Should be '2' + '3' = '5'", function () {
			const first = new Financial(settings, "2", 0);
			const second = new Financial(settings, "3", 0);
			const result = Financial.add(settings, first, second);
			assert.equal(Financial.toString(settings, result), "5");
		});
		it("Should be '0.5' + '0.7' = '1.2'", function () {
			const first = new Financial(settings, "5", 1);
			const second = new Financial(settings, "7", 1);
			const result = Financial.add(settings, first, second);
			assert.equal(Financial.toString(settings, result), "1.2");
		});
		it("Should be '1.11111112' + '1.1111111' = '2.22222222' Call method plus().", function () {
			const firstX = Financial.parse(settings, "1.11111112");
			const second = Financial.parse(settings, "1.1111111");
			const first = Financial.add(settings, firstX, second);
			assert.equal(Financial.toString(settings, first), "2.22222222");
			assert.equal(Financial.toFloat(first), 2.22222222);
		});
		it("Should be '1.11111112' + '1.1' = '2.21111112' Call method plus().", function () {
			const firstX = Financial.parse(settings, "1.11111112");
			const second = Financial.parse(settings, "1.1");
			const first = Financial.add(settings, firstX, second);
			assert.equal(Financial.toString(settings, first), "2.21111112");
			assert.equal(Financial.toFloat(first), 2.21111112);
		});
		it("Should be '-0.5' + '0.7' = '1.2'", function () {
			const first = new Financial(settings, "-5", 1);
			const second = new Financial(settings, "7", 1);
			const result = Financial.add(settings, first, second);
			assert.equal(Financial.toString(settings, result), "0.2");
		});
		it("Should be '0.50221199' + '0.00000001' = '0.50221200'", function () {
			const first = new Financial(settings, "50221199", 8);
			const second = new Financial(settings, "1", 8);
			const result = Financial.add(settings, first, second);
			assert.equal(Financial.toString(settings, result), "0.502212");
		});
		it("Should be '-0.50221199' + '0.00000001' = '-0.50221198'", function () {
			const first = new Financial(settings, "-50221199", 8);
			const second = new Financial(settings, "1", 8);
			const result = Financial.add(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-0.50221198");
		});
		it("Should be '3' - '2' = '1'", function () {
			const first = new Financial(settings, "3", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.subtract(settings, first, second);
			assert.equal(Financial.toString(settings, result), "1");
		});
		it("Should be '835798327958372985473298547983754' - '835798327958372985473298547983750' = '4'", function () {
			const first = new Financial(settings, "835798327958372985473298547983754", 0);
			const second = new Financial(settings, "835798327958372985473298547983750", 0);
			const result = Financial.subtract(settings, first, second);
			assert.equal(Financial.toString(settings, result), "4");
		});
		it("Should be '835798327958372985473298547983754'" +
			"'835798327958372985473298547983760' = '1671596655916745970946597095967514'", function () {
				const first = new Financial(settings, "835798327958372985473298547983754", 0);
				const second = new Financial(settings, "835798327958372985473298547983760", 0);
				const result = Financial.add(settings, first, second);
				assert.equal(Financial.toString(settings, result), "1671596655916745970946597095967514");
			});
		it("Should be '-3' - '2' = '-5'", function () {
			const first = new Financial(settings, "-3", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.subtract(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-5");
		});
		it("Should be '2' - '7' = '-5'", function () {
			const first = new Financial(settings, "2", 0);
			const second = new Financial(settings, "7", 0);
			const result = Financial.subtract(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-5");
		});
		it("Should be '1.11111112' - '1.1111111' = '0.00000002'. Call method minus().", function () {
			const firstX = Financial.parse(settings, "1.11111112");
			const second = Financial.parse(settings, "1.1111111");
			const first = Financial.subtract(settings, firstX, second);
			assert.equal(Financial.toString(settings, first), "0.00000002");
			assert.equal(Financial.toFloat(first), 0.00000002);
		});
		it("Should be '3' * '2' = '6'", function () {
			const first = new Financial(settings, "3", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.multiply(settings, first, second);
			assert.equal(Financial.toString(settings, result), "6");
		});
		it("Should be '-3' * '2' = '6'", function () {
			const first = new Financial(settings, "-3", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.multiply(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-6");
		});
		it("Should be '4398621354876378456537864871263' * '47382687236478236874628734'" +
			"= '208418499929801586779933357274718591590228107483830671042'", function () {
				const first = new Financial(settings, "4398621354876378456537864871263", 0);
				const second = new Financial(settings, "47382687236478236874628734", 0);
				const result = Financial.multiply(settings, first, second);
				assert.equal(Financial.toString(settings, result), "208418499929801586779933357274718591590228107483830671042");
			});
		it("Should be '4398621354876378456537864871263' / '47382687236478236874628734' = '92831.82553416'", function () {
			const first = new Financial(settings, "4398621354876378456537864871263", 0);
			const second = new Financial(settings, "47382687236478236874628734", 0);
			const result = Financial.divide(settings, first, second);
			assert.equal(Financial.toString(settings, result), "92831.82553415");
		});
		it("Should be '6' / '2' = '3'", function () {
			const first = new Financial(settings, "6", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.divide(settings, first, second);
			assert.equal(Financial.toString(settings, result), "3");
		});
		it("Should be '-6' / '2' = '-3'", function () {
			const first = new Financial(settings, "-6", 0);
			const second = new Financial(settings, "2", 0);
			const result = Financial.divide(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-3");
		});
		it("Should be '6' / '-2' = '-3'", function () {
			const first = new Financial(settings, "6", 0);
			const second = new Financial(settings, "-2", 0);
			const result = Financial.divide(settings, first, second);
			assert.equal(Financial.toString(settings, result), "-3");
		});
		it("Should plus 0.001 + 0.000001 = 0.001001", function () {
			const amount = new Financial(settings, "1", 3); // setup number 0.001
			const commission = new Financial(settings, "1", 6); // setup number 0.000001

			const sum = Financial.add(settings, amount, commission); // 0.001001
			assert.equal(sum.value, "1001");
			assert.equal(sum.fraction, 6);
		});
		it("Should minus 0.001 - 0.000001 = 0.000999", function () {
			const amount = new Financial(settings, "1", 3); // setup number 0.001
			const commission = new Financial(settings, "1", 6); // setup number 0.000001

			const sum = Financial.subtract(settings, amount, commission); // 0.000999
			assert.equal(sum.value, "999");
			assert.equal(sum.fraction, 6);
		});
		it("Should divide 0.001 / 0.02000000 = 0.05", function () {
			const left = new Financial(settings, "1", 3); // setup number 0.001
			const right = new Financial(settings, "2", 2); // setup number 0.02000000

			const result = Financial.divide(settings, left, right); // 0.05
			assert.equal(result.value, "5");
			assert.equal(result.fraction, 2);
		});
		it("Should work static equals() 0.33557701", function () {
			const left = new Financial(settings, "33557701", 8);
			const right = new Financial(settings, "33557701", 8);
			const equal = Financial.equals(left, right);
			assert.isTrue(equal);
		});
		it("Should work get value() -33557701", function () {
			const fin = new Financial(settings, "-33557701", 8);
			const value = fin.value;
			assert.equal(value, "-33557701");
		});
		it("Should work get fraction() 6", function () {
			const fin = new Financial(settings, "-33557701", 6);
			const fraction = fin.fraction;
			assert.equal(fraction, 6);
		});
		it("Should normalize via factory from to 0.1000 to 1,1", function () {
			const instanceOverConstructor = Financial.parse(settings, "0.1000"); // setup number 0.1
			assert.equal(instanceOverConstructor.value, "1");
			assert.equal(instanceOverConstructor.fraction, 1);
		});
		it("Should normalize via factory from to 10.00 to 10,0", function () {
			const instanceOverConstructor = Financial.parse(settings, "10.00"); // setup number 10
			assert.equal(instanceOverConstructor.value, "10");
			assert.equal(instanceOverConstructor.fraction, 0);
		});
		it("Should multiply integer values out of range IEEE-754", function () {
			const left = new Financial(settings, Number.MAX_SAFE_INTEGER.toString(), 0); // setup maximum integer value according IEEE-754
			const right = new Financial(settings, "5", 0);
			const multiplyResult = Financial.multiply(settings, left, right);
			assert.equal(multiplyResult.value, "45035996273704955");
			assert.equal(multiplyResult.fraction, 0);
		});
		it("Should multiply integer and decimal values out of range IEEE-754", function () {
			const left = new Financial(settings, Number.MAX_SAFE_INTEGER.toString(), 0); // setup maximum integer value according IEEE-754
			const right = new Financial(settings, "52", 1);
			const multiplyResult = Financial.multiply(settings, left, right);
			assert.equal(multiplyResult.value, "468374361246531532");
			assert.equal(multiplyResult.fraction, 1);
		});
		it("Should initialize value \"0\" via factory", function () {
			const zeroFinancial = Financial.parse(settings, "0");
			assert.equal(zeroFinancial.value, "0");
			assert.equal(zeroFinancial.fraction, 0);
		});
		it("Should initialize value \"0\" via parse", function () {
			const zeroFinancial = Financial.parse(settings, "0");
			assert.equal(zeroFinancial.value, "0");
			assert.equal(zeroFinancial.fraction, 0);
		});
		it("(Bug v0.0.1) Should work toString(): 0.00157292", function () {
			const rawPrice = 0.00157292 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "157292");
			const price = new Financial(settings, rawPriceStr, 8);
			const result = Financial.toString(settings, price);
			assert.equal(result, "0.00157292");
		});
		it("(Bug v0.0.1) Should work toString(): 0.00000152", function () {
			const rawPrice = 0.00000152 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "152");
			const price = new Financial(settings, rawPriceStr, 8);
			const result = Financial.toString(settings, price);
			assert.equal(result, "0.00000152");
		});
		it("(Bug v0.0.1) Should work toString(): -0.00000152", function () {
			const rawPrice = -0.00000152 * 100000000; // move point to 8 right
			const rawPriceStr = rawPrice.toFixed(0);
			assert.equal(rawPriceStr, "-152");
			const price = new Financial(settings, rawPriceStr, 8);
			const result = Financial.toString(settings, price);
			assert.equal(result, "-0.00000152");
		});
		it("(Bug 2.0.0) Should works same Financial constructor and financial factory", function () {
			const instanceOverConstructor = new Financial(settings, "60090", 2);
			const instanceOverFactory = Financial.fromFloat(settings, 600.90, 2);
			assert.equal(instanceOverConstructor.value, "6009");
			assert.equal(instanceOverFactory.value, "6009");
			assert.equal(instanceOverConstructor.fraction, 1);
			assert.equal(instanceOverFactory.fraction, 1);
		});
		it("(Bug 2.0.2) Should normalize via constructor from to 1000,4 to 1,1", function () {
			const instanceOverConstructor = new Financial(settings, "1000", 4); // setup number 0.1
			assert.equal(instanceOverConstructor.value, "1");
			assert.equal(instanceOverConstructor.fraction, 1);
		});
		it("(Bug 2.0.2) Should normalize via constructor from to 1000,2 to 10,0", function () {
			const instanceOverConstructor = new Financial(settings, "1000", 2); // setup number 10
			assert.equal(instanceOverConstructor.value, "10");
			assert.equal(instanceOverConstructor.fraction, 0);
		});
		it("(Bug 2.0.2) Should multiply 0.05 * 0.02000000 = 0.001", function () {
			const left = new Financial(settings, "5", 2); // setup number 0.05
			const right = new Financial(settings, "2", 2); // setup number 0.02000000

			const result = Financial.multiply(settings, left, right); // 0.001
			assert.equal(result.value, "1");
			assert.equal(result.fraction, 3);
		});
		it("(Bug 2.0.2) Should multiply 200.30 * 3.00002 = 600.904006", function () {
			const left = new Financial(settings, "2003", 1); // setup number 200.30
			const right = new Financial(settings, "300002", 5); // setup number 3.00002

			const result = Financial.multiply(settings, left, right); // 600.904006
			assert.equal(result.value, "600904006");
			assert.equal(result.fraction, 6);
		});
		it("(Bug 2.0.2) Should multiply 200.0000001 * 3.01 = 602.000000301", function () {
			const left = new Financial(settings, "2000000001", 7); // setup number 200.0000001
			const right = new Financial(settings, "301", 2); // setup number 3.01

			const result = Financial.multiply(settings, left, right); // 602.000000301
			assert.equal(result.value, "602000000301");
			assert.equal(result.fraction, 9);
		});
		it("(Bug 2.0.3) Should truncate 0.00452 to value 0 and fraction 0", function () {
			const a = Financial.fromFloat(settings, 0.00452, 2);

			assert.equal(a.value, "0");
			assert.equal(a.fraction, 0);
		});
		it("(Bug 2.0.4) Should multiply 2366.06639088(XRP) * 0.00008328(Price) = 0.19704600(BTC)", function () {
			const left = new Financial(settings, "236606639088", 8); // setup number 2366.06639088
			const right = new Financial(settings, "8328", 8); // setup number 0.00008328

			const result = Financial.multiply(settings, left, right); // 0.1970460090324864
			assert.equal(result.value, "1970460090324864");
			assert.equal(result.fraction, 16);
		});
		it("(Bug 2.0.4) Should multiply 262.75618992 * 0.03742 = 9.8323366268064", function () {
			const left = new Financial(settings, "26275618992", 8); // setup number 262.75618992
			const right = new Financial(settings, "3742", 5); // setup number 0.03742

			const result = Financial.multiply(settings, left, right); // 9.8323366268064
			assert.equal(result.value, "98323366268064");
			assert.equal(result.fraction, 13);
		});
		it.skip("(Bug 2.0.5) Should avoid approximation as long number (toString)(number, number)", function () {

			// TODO: THIS TEST IS INCORRECT
			// The number value 1234567890123456789012345678890.09 cannot be presented as IEEE-754 without rounding.

			const money = Financial.fromFloat(settings, 1234567890123456789012345678890.09, 2);
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "1234567890123456789012345678890.09");
		});
		it("(Bug 2.0.5) Should avoid approximation as long number (toString)(string)", function () {
			const money = Financial.parse(settings, "1234567890123456789012345678890.09");
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "1234567890123456789012345678890.09");
		});
		it("(Bug 2.0.5) Should avoid approximation as long number (toString)(string, number)", function () {
			const money = new Financial(settings, "123456789012345678901234567889009", 2);
			const toString = Financial.toString(settings, money);
			assert.equal(toString, "1234567890123456789012345678890.09");
		});
		it("(Bug 3.0.2) Should initialize value \"0.0000000000000000\" via factory", function () {
			const zeroFinancial = Financial.parse(settings, "0.0000000000000000");
			assert.equal(zeroFinancial.value, "0");
			assert.equal(zeroFinancial.fraction, 0);
		});
		it("(Bug 3.0.2) Should initialize value \"0.0000000000000000\" via parse", function () {
			const zeroFinancial = Financial.parse(settings, "0.0000000000000000");
			assert.equal(zeroFinancial.value, "0");
			assert.equal(zeroFinancial.fraction, 0);
		});
		it("(Bug 3.0.3) Should initialize value \"0.000000005982606\" via factory", function () {
			const zeroFinancial = Financial.parse(settings, "0.000000005982606");
			assert.equal(zeroFinancial.value, "5982606");
			assert.equal(zeroFinancial.fraction, 15);
		});
		it("(Bug 3.0.3) Should initialize value \"0.000000005982606\" via parse", function () {
			const zeroFinancial = Financial.parse(settings, "0.000000005982606");
			assert.equal(zeroFinancial.value, "5982606");
			assert.equal(zeroFinancial.fraction, 15);
		});
		it.skip("(Bug 3.0.3) Should initialize value \"-0\" via parse", function () {
			const zeroFinancial = Financial.parse(settings, "-0");
			assert.equal(zeroFinancial.value, "0");
			assert.equal(zeroFinancial.fraction, 0);
		});
		it("(Bug 3.2.9) 24.2644184325 BTC need to divive to BCN price 0.00000017 should be equal 142731873.1323529481 BCN", function () {
			const result = Financial.divide(settings,
				Financial.wrap(settings, { sign: "+", whole: "24", fractional: "2644184325" }),
				Financial.wrap(settings, { sign: "+", whole: "0", fractional: "00000017" })
			);
			assert.equal(result.value, "14273187313235294");
			assert.equal(result.fraction, 8);
		});
		it("(Bug 3.2.9) 0 BTC need to divide to BCN price 0.00000017 should be equal 0.0 BCN", function () {
			const result = Financial.divide(settings,
				Financial.wrap(settings, { sign: null, whole: "0", fractional: "0" }),
				Financial.wrap(settings, { sign: "+", whole: "0", fractional: "00000017" })
			);
			assert.equal(result.value, "0");
			assert.equal(result.fraction, 0);
		});
		it("Should instance with value=1 fraction=1", function () {
			const first = Financial.fromFloat(settings, 1, 1);
			assert.equal(first.fraction, 0);
			assert.equal(first.value, "1");
			assert.equal(Financial.toString(settings, first), "1");
			assert.equal(Financial.toInt(settings, first), 1);
		});
		it("Should be is not isFinancial", function () {
			const result = financial.isFinancial([]);
			assert.equal(result, false);
		});
	});

	describe("Negative tests", function () {
		it("Should NOT instance with value=\"123.123.123\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial(settings, "123.123.123", 3);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with value=\"a\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial(settings, "a", 0);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with fraction=0.4", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial(settings, "123", 0.4);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should NOT instance with value=\"00055000\"", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				new Financial(settings, "00055000", 8);
			} catch (e) {
				//expected
				return;
			}
			assert.fail("Should never happened");
		});

		it("Should be execution error Invalid financial value.", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				Financial.parse(settings, "0,213");
			} catch (err) {
				assert((<any>err).message.startsWith("Invalid financial value. Expected decimal string"));
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should be execution error Wrong value is finite float.", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				Financial.fromFloat(settings, NaN, 0);
			} catch (err) {
				assert((<any>err).message.startsWith("Wrong value. Expected finite float value."));
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should be execution error Wrong value is safe integer.", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				Financial.fromInt(settings, NaN);
			} catch (err) {
				assert((<any>err).message.startsWith("Wrong value. Expected safe integer value."));
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should be execution error Wrong argument fraction on method round", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				const number = Financial.fromFloat(settings, 123, 2);
				const finNumber = Financial.round(settings, number, -1.45, zxteam.Financial.RoundMode.Round);
			} catch (err) {
				assert((<any>err).message.startsWith("Wrong argument fraction. Expected integer >= 0"));
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should be execution error Wrong argument fraction on method floor", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				const number = Financial.fromFloat(settings, 123, 2);
				const finNumber = Financial.floor(settings, number, -1.45);
			} catch (err) {
				assert((<any>err).message.startsWith("Wrong argument fraction. Expected integer >= 0"));
				return;
			}
			assert.fail("Should never happened");
		});
		it("Should be execution error Wrong argument fraction on method ceil", function () {
			try {
				// tslint:disable-next-line no-unused-expression
				const number = Financial.fromFloat(settings, 123, 2);
				const finNumber = Financial.ceil(settings, number, -1.45);
			} catch (err) {
				assert((<any>err).message.startsWith("Wrong argument fraction. Expected integer >= 0"));
				return;
			}
			assert.fail("Should never happened");
		});
		it("(Bug 2.0.1) Should raise error when division by zero occurs", function () {
			const first = Financial.fromFloat(settings, 0, 0);
			const second = Financial.fromFloat(settings, 0, 0);
			let expectedError;
			try {
				Financial.divide(settings, first, second);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Division by zero");
		});
		it("(Bug 2.0.1) Should raise error when Modulus by zero occurs", function () {
			const first = Financial.fromFloat(settings, 0, 0);
			const second = Financial.fromFloat(settings, 0, 0);
			let expectedError;
			try {
				Financial.mod(settings, first, second);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Modulus by zero");
		});
		it("Should wrong arguments and throw error in function add", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.add(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function divide", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.divide(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function equals", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.equals(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function gt", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.gt(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function gte", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.gte(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function isZero", function () {
			const num: any = 23;
			let expectedError;
			try {
				financial.isZero(num);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function lt", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.lt(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function lte", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.lte(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function mod", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.mod(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function multiply", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.multiply(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function parse", function () {
			const num: any = 23;
			let expectedError;
			try {
				financial.parse(num);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function round", function () {
			const num: any = 23;
			const fraction: any = 23;
			let expectedError;
			try {
				financial.round(num, fraction, zxteam.Financial.RoundMode.Round);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function subtract", function () {
			const left: any = 23;
			const right: any = 23;
			let expectedError;
			try {
				financial.subtract(left, right);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function toFloat", function () {
			const num: any = 23;
			let expectedError;
			try {
				financial.toFloat(num);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function toInt", function () {
			const num: any = 23;
			let expectedError;
			try {
				financial.toInt(num);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function toString", function () {
			const num: any = 23;
			let expectedError;
			try {
				financial.toString(num);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function floor", function () {
			const num: any = 23;
			const fraction: any = 23;
			let expectedError;
			try {
				financial.round(num, fraction, zxteam.Financial.RoundMode.Floor);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should wrong arguments and throw error in function ceil", function () {
			const num: any = 23;
			const fraction: any = 23;
			let expectedError;
			try {
				financial.round(num, fraction, zxteam.Financial.RoundMode.Ceil);
			} catch (e) {
				expectedError = e;
			}
			assert.instanceOf(expectedError, Error);
			assert.equal(expectedError.message, "Wrong arguments passed");
		});
		it("Should right JSON.stringify", function () {
			const v = Financial.parse(settings, "-123.456789");
			const s = JSON.stringify(v);
			assert.equal(s, "{\"sign\":\"-\",\"whole\":\"123\",\"fractional\":\"456789\"}");
		});
		it("Should inverse()", function () {
			const v = Financial.parse(settings, "-123.456789");
			const s = v.inverse();
			assert.equal(s.sign, "+");
			assert.equal(s.whole, "123");
			assert.equal(s.fractional, "456789");
		});
		it("Should inverse()", function () {
			const v = Financial.parse(settings, "123.456789");
			const s = v.inverse();
			assert.equal(s.sign, "-");
			assert.equal(s.whole, "123");
			assert.equal(s.fractional, "456789");
		});
	});
});
