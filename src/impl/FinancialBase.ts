import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Settings } from "../contract";

export abstract class FinancialBase implements zxteam.Financial {
	public static readonly FinancialNumberRegExp = /^(-|\+?)(0|[1-9][0-9]*)(\\.[0-9]*[1-9])?$/;
	public static readonly FinancialWholePartRegex = /^(0|[1-9][0-9]*)$/;
	public static readonly FinancialFractionalPartRegex = /^([0-9]*[1-9])$/;

	public static parse(settings: Settings, num: string): zxteam.Financial {
		const matches = FinancialBase.FinancialNumberRegExp.exec(num);
		if (matches !== null && matches.length === 3) {
			//
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
