// tslint:disable: max-line-length
import * as zxteam from "@zxteam/contract";

import { assert } from "chai";

import { setup } from "../../src/index";

const financial = setup({
	backend: "string",
	decimalSeparator: ".",
	defaultRoundOpts: {
		fractionalDigits: 10,
		roundMode: zxteam.Financial.RoundMode.Round
	}
});

interface TestCases {
	roundMode: Array<[zxteam.Financial/*given*/, number/*round fractional*/, zxteam.Financial/*expected result*/]>;
	truncMode: Array<[zxteam.Financial/*given*/, number/*round fractional*/, zxteam.Financial/*expected result*/]>;
}

const testCases: TestCases = {
	roundMode: [
		[{ sign: "+", whole: "1", fractional: "551" }, 8, { sign: "+", whole: "1", fractional: "551" }],
		[{ sign: "-", whole: "123", fractional: "951" }, 1, { sign: "-", whole: "124", fractional: "0" }],  // Float => Float, round-down, Math.round(-1239.51) => -1240
		[{ sign: "+", whole: "123", fractional: "951" }, 1, { sign: "+", whole: "124", fractional: "0" }],  // Float => Float, round-up, Math.round(1239.51) => 1240
		[{ sign: "-", whole: "123", fractional: "94" }, 1, { sign: "-", whole: "123", fractional: "9" }],  // Float => Float, round-down, Math.round(-1239.9) => -1240
		[{ sign: "+", whole: "123", fractional: "94" }, 1, { sign: "+", whole: "123", fractional: "9" }],  // Float => Float, round-up, Math.round(1239.9) => 1240
		[{ sign: "-", whole: "123", fractional: "95" }, 1, { sign: "-", whole: "123", fractional: "9" }], // Float => Float, round-up, Math.round(-1239.5) => -1239
		[{ sign: "+", whole: "123", fractional: "95" }, 1, { sign: "+", whole: "124", fractional: "0" }],  // Float => Float, round-up, Math.round(1239.5) => 1240
		[{ sign: "+", whole: "123", fractional: "59" }, 1, { sign: "+", whole: "123", fractional: "6" }],
		[{ sign: "+", whole: "123", fractional: "99" }, 1, { sign: "+", whole: "124", fractional: "0" }],
		[{ sign: "+", whole: "123", fractional: "99" }, 0, { sign: "+", whole: "124", fractional: "0" }],
		[{ sign: "-", whole: "15", fractional: "551" }, 1, { sign: "-", whole: "15", fractional: "6" }], // Math.round(-155.51) => -156
		[{ sign: "+", whole: "155", fractional: "5" }, 0, { sign: "+", whole: "156", fractional: "0" }], // Math.round(155.50) => 156
		[{ sign: "-", whole: "155", fractional: "5" }, 0, { sign: "-", whole: "155", fractional: "0" }], // Math.round(-155.50) => -155
		[{ sign: "+", whole: "15", fractional: "55" }, 1, { sign: "+", whole: "15", fractional: "6" }], // Math.round(155.50) => 156
		[{ sign: "-", whole: "15", fractional: "55" }, 1, { sign: "-", whole: "15", fractional: "5" }], // Math.round(-155.50) => -155
		[{ sign: "+", whole: "155", fractional: "51" }, 0, { sign: "+", whole: "156", fractional: "0" }], // Math.round(155.51) => 156
		[{ sign: "-", whole: "155", fractional: "51" }, 0, { sign: "-", whole: "156", fractional: "0" }], // Math.round(-155.51) => -156
		[{ sign: "+", whole: "1", fractional: "559" }, 2, { sign: "+", whole: "1", fractional: "56" }],
		[{ sign: "+", whole: "1", fractional: "555" }, 2, { sign: "+", whole: "1", fractional: "56" }],
		[{ sign: "+", whole: "1", fractional: "554" }, 2, { sign: "+", whole: "1", fractional: "55" }],
		[{ sign: "-", whole: "1", fractional: "554" }, 2, { sign: "-", whole: "1", fractional: "55" }],
		[{ sign: "+", whole: "1", fractional: "551" }, 2, { sign: "+", whole: "1", fractional: "55" }],
		[{ sign: "+", whole: "0", fractional: "3" }, 1, { sign: "+", whole: "0", fractional: "3" }],
		[{ sign: "-", whole: "0", fractional: "3" }, 3, { sign: "-", whole: "0", fractional: "3" }],
		[{ sign: "-", whole: "0", fractional: "83475643" }, 5, { sign: "-", whole: "0", fractional: "83476" }],
		[{ sign: "+", whole: "1", fractional: "759" }, 0, { sign: "+", whole: "2", fractional: "0" }],
		[{ sign: "+", whole: "1", fractional: "759" }, 8, { sign: "+", whole: "1", fractional: "759" }],
		[{ sign: "+", whole: "150", fractional: "12341" }, 4, { sign: "+", whole: "150", fractional: "1234" }],
		[{ sign: "+", whole: "142731873", fractional: "13235" }, 5, { sign: "+", whole: "142731873", fractional: "13235" }],
		[{ sign: "+", whole: "123", fractional: "99" }, 1, { sign: "+", whole: "124", fractional: "0" }],
		[{ sign: "+", whole: "142731873", fractional: "1323529482" }, 10, { sign: "+", whole: "142731873", fractional: "1323529482" }],
		[{ sign: "+", whole: "142731873", fractional: "1323529482" }, 1, { sign: "+", whole: "142731873", fractional: "1" }],
		[{ sign: "+", whole: "238479237492834289347923743453", fractional: "45345" }, 0, { sign: "+", whole: "238479237492834289347923743453", fractional: "0" }],
		[{ sign: "+", whole: "238479237492834289347923743453", fractional: "44345" }, 1, { sign: "+", whole: "238479237492834289347923743453", fractional: "4" }],
		[{ sign: "+", whole: "238479237492834289347923743453", fractional: "45" }, 1, { sign: "+", whole: "238479237492834289347923743453", fractional: "5" }],
		[{ sign: "+", whole: "238479237492834289347923743453", fractional: "45345" }, 1, { sign: "+", whole: "238479237492834289347923743453", fractional: "5" }],
		[{ sign: "-", whole: "238479237492834289347923743453", fractional: "44345" }, 1, { sign: "-", whole: "238479237492834289347923743453", fractional: "4" }],
		[{ sign: "-", whole: "238479237492834289347923743453", fractional: "45" }, 1, { sign: "-", whole: "238479237492834289347923743453", fractional: "4" }],
		[{ sign: "-", whole: "238479237492834289347923743453", fractional: "45345" }, 1, { sign: "-", whole: "238479237492834289347923743453", fractional: "5" }],
		[{ sign: "+", whole: "0", fractional: "00001415903101129128" }, 8, { sign: "+", whole: "0", fractional: "00001416" }],
		[{ sign: "+", whole: "0", fractional: "037060335" }, 8, { sign: "+", whole: "0", fractional: "03706034" }]
	],
	truncMode: [
		[{ sign: "+", whole: "0", fractional: "018785799" }, 8, { sign: "+", whole: "0", fractional: "01878579" }],
		[{ sign: "+", whole: "0", fractional: "0528" }, 8, { sign: "+", whole: "0", fractional: "0528" }],
		[{ sign: "+", whole: "0", fractional: "000001005728" }, 9, { sign: "+", whole: "0", fractional: "000001005" }]
	]
};

describe("round", function () {
	testCases.roundMode.forEach(roundCase => {
		const [input, newFraction, expectedResult] = roundCase;
		it(`Should round "${JSON.stringify(input)}" for new fractional ${newFraction} to whole:"${JSON.stringify(expectedResult)}"`,
			function () {
				const result = financial.round(input, newFraction, zxteam.Financial.RoundMode.Round);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			}
		);
	});
	testCases.truncMode.forEach(roundCase => {
		const [input, newFraction, expectedResult] = roundCase;
		it(`Should trunc "${JSON.stringify(input)}" for new fractional ${newFraction} to whole:"${JSON.stringify(expectedResult)}"`,
			function () {
				const result = financial.round(input, newFraction, zxteam.Financial.RoundMode.Trunc);
				assert.equal(result.sign, expectedResult.sign);
				assert.equal(result.whole, expectedResult.whole);
				assert.equal(result.fractional, expectedResult.fractional);
			}
		);
	});
});
