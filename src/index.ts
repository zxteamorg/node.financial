import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Settings } from "./Settings";
import { FinancialOperation } from "./FinancialOperation";

export * from "./FinancialOperation";
export * from "./Settings";

export function setup(backend: Settings.Backend, settings: Settings): FinancialOperation {
	const backendClass = (function () {
		switch (backend) {
			case Settings.Backend.bignumberjs: {
				try {
					const { default: implClass } = require("./impl/BigNumberFinancial");
					return implClass;
				} catch (e) {
					console.error(e);
					throw new Error(`Cannot load backend: ${backend}. Check/install an optional package: npm install bignumber.js`);
				}
			}
			default: throw new Error(`Not supported backend: ${backend}`);
		}
	})();

	const instance: FinancialOperation = {
		abs(value: any): any {
			if (value instanceof backendClass) {
				return value.abs();
			} else if (_.isString(value)) {
				const friendlyValue = backendClass.parse(value, settings);
				return friendlyValue.abs().toString();
			}
			throw new Error("Wrong arguments passed");
		},

		add(left: any, right: any): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.add(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.add(friendlyRight).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		divide(left: any, right: any, roundMode?: zxteam.Financial.RoundMode): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.divide(right, roundMode);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.divide(friendlyRight, roundMode).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		equals(left: any, right: any): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.equals(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.equals(friendlyRight);
			}
			throw new Error("Wrong arguments passed");
		},

		ensure(value: zxteam.Financial, errorMessage?: string): zxteam.Financial {
			return backendClass.ensure(value, errorMessage);
		},

		ensureNullable(value: zxteam.Financial | null, errorMessage?: string): zxteam.Financial | null {
			return backendClass.ensureNullable(value, errorMessage);
		},

		fromFloat(value: number): zxteam.Financial {
			return backendClass.fromFloat(value, settings);
		},

		fromInt(value: number): zxteam.Financial {
			return backendClass.fromInt(value, settings);
		},

		gt(left: any, right: any): boolean {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.gt(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.gt(friendlyRight);
			}
			throw new Error("Wrong arguments passed");
		},

		gte(left: any, right: any): boolean {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.gte(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.gte(friendlyRight);
			}
			throw new Error("Wrong arguments passed");
		},

		isNegative(test: any) {
			if (test instanceof backendClass) {
				return test.isNegative();
			} else if (_.isString(test)) {
				const friendlyTest = backendClass.parse(test, settings);
				return friendlyTest.isNegative();
			}
			throw new Error("Wrong arguments passed");
		},

		isPositive(test: any) {
			if (test instanceof backendClass) {
				return test.isPositive();
			} else if (_.isString(test)) {
				const friendlyTest = backendClass.parse(test, settings);
				return friendlyTest.isPositive();
			}
			throw new Error("Wrong arguments passed");
		},

		isZero(test: any): boolean {
			if (test instanceof backendClass) {
				return test.isZero();
			} else if (_.isString(test)) {
				const friendlyTest = backendClass.parse(test, settings);
				return friendlyTest.isZero();
			}
			throw new Error("Wrong arguments passed");
		},

		inverse(value: any): any {
			if (value instanceof backendClass) {
				return value.inverse();
			} else if (_.isString(value)) {
				const friendlyValue = backendClass.parse(value, settings);
				return friendlyValue.inverse().toString();
			}
			throw new Error("Wrong arguments passed");
		},

		lt(left: any, right: any): boolean {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.lt(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.lt(friendlyRight);
			}
			throw new Error("Wrong arguments passed");
		},

		lte(left: any, right: any): boolean {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.lte(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.lte(friendlyRight);
			}
			throw new Error("Wrong arguments passed");
		},

		max(left: any, right: any): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.max(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.max(friendlyRight).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		min(left: any, right: any): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.min(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.min(friendlyRight).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		mod(left: any, right: any, roundMode?: zxteam.Financial.RoundMode): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.mod(right, roundMode);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.mod(friendlyRight, roundMode).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		multiply(left: any, right: any, roundMode?: zxteam.Financial.RoundMode): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.multiply(right, roundMode);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.multiply(friendlyRight, roundMode).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		parse(value: string): zxteam.Financial {
			if (_.isString(value)) {
				return backendClass.parse(value, settings);
			}
			throw new Error("Wrong arguments passed");
		},

		round(value: any, fractionDigits: zxteam.Financial.FractionDigits, roundMode?: zxteam.Financial.RoundMode): any {
			if (value instanceof backendClass) {
				return value.round(fractionDigits, roundMode);
			} else if (_.isString(value)) {
				const friendlyValue = backendClass.parse(value, settings);
				return friendlyValue.round(fractionDigits, roundMode).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		subtract(left: any, right: any): any {
			if (left instanceof backendClass && right instanceof backendClass) {
				return left.subtract(right);
			} else if (_.isString(left) && _.isString(right)) {
				const friendlyLeft = backendClass.parse(left, settings);
				const friendlyRight = backendClass.parse(right, settings);
				return friendlyLeft.subtract(friendlyRight).toString();
			}
			throw new Error("Wrong arguments passed");
		},

		toFloat(value: zxteam.Financial): number {
			if (value instanceof backendClass) {
				return value.toFloat();
			} else if (_.isString(value)) {
				const friendlyValue = backendClass.parse(value, settings);
				return friendlyValue.toFloat();
			}
			throw new Error("Wrong arguments passed");
		},

		toInt(value: zxteam.Financial): number {
			if (value instanceof backendClass) {
				return value.toInt();
			} else if (_.isString(value)) {
				const friendlyValue = backendClass.parse(value, settings);
				return friendlyValue.toInt();
			}
			throw new Error("Wrong arguments passed");
		}
	};

	return instance;
}

export const DEFAULT_SETTINGS: Settings = Object.freeze({
	decimalSeparator: ".",
	defaultRoundOpts: {
		fractionalDigits: 32,
		roundMode: zxteam.Financial.RoundMode.Round
	}
});

export const financial: FinancialOperation = Object.freeze(setup(Settings.Backend.bignumberjs, DEFAULT_SETTINGS));

export default financial;
