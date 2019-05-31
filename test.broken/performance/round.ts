import * as zxteam from "@zxteam/contract";

import * as bignumberjs from "bignumber.js";
import * as decimaljs from "decimal.js";
import * as mathjs from "mathjs";

import { Financial, DEFAULT_SETTINGS } from "../../src/index";
import { FinancialBase } from "../../src/impl/FinancialBase";
import { PerformanceResult, PerformanceTestContext } from "./_contract";

interface TestCases {
	positive: Array<[zxteam.Financial/*given*/, number/*round fraction*/, zxteam.Financial/*expected result*/]>;
}

const testCases: Array<string> = ["11.445"];

function financialStringCall() {
	return FinancialBase.wrap({ value: "11445", fraction: 3 }).round(0);
}
function decimaljsStringCall() {
	return decimaljs.Decimal.round("11.445");
}
function mathjsStringCall() {
	return mathjs.round(mathjs.parse("11.445").value);
}

const context: PerformanceTestContext = Object.freeze({
	given: {
		nativeTests: [{
			financial: {
				input: { value: "11445", fraction: 3 },
				desiredFraction: 0
			}
		}],
		stringTests: [{
			input: "11.445",
			desiredFraction: 0
		}]
	},
	impls: {
		financial: {
			stringCall(args: any) {
				const num = Financial.parse(DEFAULT_SETTINGS, args.input);
				FinancialBase.wrap(num).round(args.desiredFraction);
			},
			nativeCall(args: any) {
				FinancialBase.wrap(args.input).round(args.desiredFraction);
			}
		}
	}
});

export default context;
