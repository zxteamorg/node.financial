import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Fraction } from "./Fraction";
import { Settings } from "./contract";
import { Financial, FinancialOperation } from "./contract";

import { BigIntFinancial } from "./impl/BigIntFinancial";
import { FinancialBase } from "./impl/FinancialBase";
import { FinancialLegacy } from "./impl/FinancialLegacy";

export function setup(settings: Settings): FinancialOperation {
	const wrap: (num: any) => Financial = (function () {
		switch (settings.backend) {
			case "bigint": return BigIntFinancial.wrap.bind(BigIntFinancial);
			case "string": return function (v: any) {
				if (_.isString(v)) {
					return FinancialLegacy.wrap(settings, FinancialBase.parse(settings, v));
				}
				return FinancialLegacy.wrap(settings, v);
			};
			default: throw new Error(`Not supported backend: ${settings.backend}`);
		}
	})();

	const instance: FinancialOperation = Object.freeze({
		abs(num: any): any {
			throw new Error("Not implemented yet");
		},

		add(left: any, right: any): any {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.add(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		divide(left: any, right: any): any {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.divide(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		equals(left: any, right: any): boolean {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.equalsTo(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		fromBigInt(value: BigInt): Financial {
			return wrap(value.toString());
		},

		fromFloat(value: number, fractionDigits: number): Financial {
			return wrap(value.toFixed(fractionDigits));
		},

		fromInt(value: number): Financial {
			return wrap(value.toFixed(0));
		},

		gt(left: any, right: any): boolean {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.gt(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		gte(left: any, right: any): boolean {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.gte(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		isFinancial: FinancialBase.isFinancial.bind(FinancialBase),

		isNegative(test: zxteam.Financial) {
			return test.sign === "-";
		},
		isPositive(test: zxteam.Financial) {
			return test.sign === "+";
		},

		isZero(num: any): boolean {
			if (_.isString(num) || FinancialBase.isFinancial(num)) {
				return wrap(num).isZero();
			}
			throw new Error("Wrong arguments passed");
		},

		inverse(num: any): any {
			if (
				(_.isString(num)) ||
				(FinancialBase.isFinancial(num))
			) {
				return wrap(num).inverse();
			}

			throw new Error("Wrong arguments passed");
		},

		lt(left: any, right: any): boolean {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.lt(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		lte(left: any, right: any): boolean {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.lte(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		max(left: any, right: any): any {
			throw new Error("Not implemented yet");
		},

		min(left: any, right: any): any {
			throw new Error("Not implemented yet");
		},

		mod(left: any, right: any): any {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.mod(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		multiply(left: any, right: any): any {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.multiply(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		parse(value: string): Financial {
			if (_.isString(value)) {
				return wrap(FinancialBase.parse(settings, value));
			}
			throw new Error("Wrong arguments passed");
		},

		round(num: any, fraction: Fraction, mode: zxteam.Financial.RoundMode): any {
			if (
				(_.isString(num)) ||
				(FinancialBase.isFinancial(num))
			) {
				const friendlyNum = wrap(num);
				return friendlyNum.round(fraction, mode);
			}

			throw new Error("Wrong arguments passed");
		},

		subtract(left: any, right: any): any {
			if (
				(_.isString(left) && _.isString(right)) ||
				(FinancialBase.isFinancial(left) && FinancialBase.isFinancial(right))
			) {
				const friendlyLeft = wrap(left);
				const friendlyRight = wrap(right);
				return friendlyLeft.subtract(friendlyRight);
			}

			throw new Error("Wrong arguments passed");
		},

		toFloat(num: zxteam.Financial): number {
			if (FinancialBase.isFinancial(num)) {
				return wrap(num).toFloat();
			}
			throw new Error("Wrong arguments passed");
		},

		toInt(num: zxteam.Financial): number {
			if (FinancialBase.isFinancial(num)) {
				return wrap(num).toInt();
			}
			throw new Error("Wrong arguments passed");
		},

		toString(num: zxteam.Financial): string {
			if (FinancialBase.isFinancial(num)) {
				return wrap(num).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		wrap
	});
	return instance;
}
export const DEFAULT_SETTINGS: Settings = Object.freeze({
	backend: "string",
	decimalSeparator: ".",
	arithmeticMaxFractionalDigits: 32,
	arithmeticRoundMode: zxteam.Financial.RoundMode.Round
});
export const financial: FinancialOperation = setup(DEFAULT_SETTINGS);
export default financial;

