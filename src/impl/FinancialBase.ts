import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Settings } from "../contract";
import * as heplers from "../heplers";

export abstract class FinancialBase implements zxteam.Financial {
	public static readonly FinancialNumberRegExp = /^(-|\+?)(0|[1-9][0-9]*)(\.\d+)?$/;
	public static readonly FinancialWholePartRegex = /^(0|[1-9][0-9]*)$/;
	public static readonly FinancialFractionalPartRegex = /^(0|[0-9]*[1-9])$/;

	public static parse(settings: Settings, num: string): zxteam.Financial {
		const matches = num.match(FinancialBase.FinancialNumberRegExp);
		if (matches !== null && matches.length === 4) {
			//
			const sign = matches[1] === "-" ? "-" : "+";
			const whole = matches[2];
			const fractional = matches[3] !== undefined ? heplers.trimEndZeros(matches[3].substr(1)) : "0";

			return {
				sign, whole, fractional
			};
		}

		throw new Error("Invalid financial value. Expected decimal string");

	}

	public static isFinancial(test: any): test is zxteam.Financial {
		if (
			_.isObjectLike(test)
			&& (
				(_.isString(test.sign) && (test.sign === "+" || test.sign === "-"))
				|| test.sign === null
			)
			&& _.isString(test.whole)
			&& _.isString(test.fractional)
		) {
			if (
				FinancialBase.FinancialWholePartRegex.test(test.whole) &&
				FinancialBase.FinancialFractionalPartRegex.test(test.fractional)
			) {
				return true;
			}
		}
		return false;
	}


	/**
	 * "+" - for positive values
	 * "-" - for negative values
	 * null - for ZERO
	 */
	public sign: "+" | "-" | null;

	/**
	 * Whole part of number in string format
	 * RegExp: ^(0|[1-9][0-9]*)$
	 */
	public whole: string;

	/**
	 * Fractional part of number in string format
	 * RegExp: ^(0|[1-9][0-9]*)$
	 */
	public fractional: string;

	public abstract round(fraction: number): FinancialBase;
}


