import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

namespace heplers {
	export function isFinancial(testValue: any): testValue is zxteam.Financial {
		if (_.isObjectLike(testValue) && _.isString(testValue.value) && Fraction.isFraction(testValue.fraction)) {
			if (valueRegExp.test(testValue.value)) {
				return true;
			}
		}
		return false;
	}

	export class UnreachableRoundMode extends Error {
		public constructor(mode: never) {
			super(`Unsupported round mode: ${mode}`);
		}
	}

	export const valueRegExp = /^-?(0|[1-9][0-9]*)$/;
}

export type Fraction = number;
export namespace Fraction {
	export function isFraction(testFraction: number): testFraction is Fraction {
		if (Number.isSafeInteger(testFraction) && testFraction >= 0) {
			return true;
		} else {
			return false;
		}
	}
	export function verifyFraction(testFraction: Fraction): void {
		if (!isFraction(testFraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
	}
}

export namespace FinancialSettings {
	export const enum ROUND_MODE {
		CEIL = "CEIL",
		FLOOR = "FLOOR",
		ROUND = "ROUND"
	}
}
export interface FinancialSettings {
	readonly decimalSeparator: string;
	readonly maxFraction: Fraction;
	readonly roundMode: FinancialSettings.ROUND_MODE;
}

export interface FinancialOperation {
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(num: string): string;
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(num: zxteam.Financial): zxteam.Financial;

	add(left: string, right: string): string;
	add(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	/**
	 * Analog of Math.ceil(), but ceil to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
	 */
	ceil(num: string, fraction: Fraction): string;
	/**
	 * Analog of Math.ceil(), but ceil to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
	 */
	ceil(num: zxteam.Financial, fraction: Fraction): zxteam.Financial;

	divide(left: string, right: string): string;
	divide(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	equals(left: string, right: string): boolean;
	equals(left: zxteam.Financial, right: zxteam.Financial): boolean;

	/**
	 * Analog of Math.floor(), but floor to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
	 */
	floor(num: string, fraction: Fraction): string;
	/**
	 * Analog of Math.floor(), but floor to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
	 */
	floor(num: zxteam.Financial, fraction: Fraction): zxteam.Financial;

	fromBigInt(value: BigInt): zxteam.Financial;

	fromFloat(value: number, fraction: Fraction): zxteam.Financial;

	fromInt(value: number): zxteam.Financial;

	gt(left: string, right: string): boolean;
	gt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	gte(left: string, right: string): boolean;
	gte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	isFinancial(testNum: any): testNum is zxteam.Financial;

	isZero(num: string): boolean;
	isZero(num: zxteam.Financial): boolean;

	lt(left: string, right: string): boolean;
	lt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	lte(left: string, right: string): boolean;
	lte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: string, right: string): string;
	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: string, right: string): string;
	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	mod(left: string, right: string): string;
	mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	multiply(left: string, right: string): string;
	multiply(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	parse(value: string): zxteam.Financial;

	/**
	 * Analog of Math.round(), but random to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
	 */
	round(num: string, fraction: Fraction): string;
	/**
	 * Analog of Math.round(), but random to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
	 */
	round(num: zxteam.Financial, fraction: Fraction): zxteam.Financial;

	subtract(left: string, right: string): string;
	subtract(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	toFloat(num: zxteam.Financial): number;
	toInt(num: zxteam.Financial): number;
	toString(num: zxteam.Financial): string;

	/**
	 * Analog of Math.trunc(), but truncate to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
	 */
	trunc(num: string, fraction: Fraction): string;
	/**
	 * Analog of Math.trunc(), but truncate to desired `fraction`
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
	 */
	trunc(num: zxteam.Financial, fraction: Fraction): zxteam.Financial;
}

export class Financial implements zxteam.Financial {
	public static readonly FinancialStringRegExp = /^(-?)(0|[1-9][0-9]*)(\\.[0-9]*[1-9])?$/;
	public static readonly ZERO: zxteam.Financial = Financial.fromInt(0);

	public readonly value: string;
	public readonly fraction: Fraction;

	public static add(left: zxteam.Financial, right: zxteam.Financial): Financial {
		const summaryLength = left.value.length + right.value.length;
		const fraction = Math.max(left.fraction, right.fraction);
		const diffFraction = left.fraction - right.fraction;
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = Number.parseInt(left.value);
			const friendlyRightValue = Number.parseInt(right.value);
			let result: number;
			if (diffFraction > 0) {
				const rightZero = Math.pow(10, diffFraction);
				result = friendlyLeftValue + (friendlyRightValue * rightZero);
			} else if (diffFraction < 0) {
				const leftZero = Math.pow(10, Math.abs(diffFraction));
				result = (friendlyLeftValue * leftZero) + friendlyRightValue;
			} else {
				result = friendlyLeftValue + friendlyRightValue;
			}

			const financialValue = new Financial(result.toString(), fraction);
			return { value: financialValue.value, fraction: financialValue.fraction };

		} else {
			// Use BigInt arithmetic instead
			const friendlyLeftValue = BigInt(left.value);
			const friendlyRightValue = BigInt(right.value);
			let result: BigInt;
			if (diffFraction > 0) {
				const rightZero = Math.pow(10, diffFraction);
				result = friendlyLeftValue + (friendlyRightValue * BigInt(rightZero));
			} else if (diffFraction < 0) {
				const leftZero = Math.pow(10, Math.abs(diffFraction));
				result = (friendlyLeftValue * BigInt(leftZero)) + friendlyRightValue;
			} else {
				result = friendlyLeftValue + friendlyRightValue;
			}

			const financialValue = new Financial(result.toString(), fraction);
			return { value: financialValue.value, fraction: financialValue.fraction };
		}
	}

	public static divide(settings: FinancialSettings, left: zxteam.Financial, right: zxteam.Financial): Financial {
		if (Financial.isZero(right)) {
			throw new Error("Division by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const maxFraction: number = Math.max(left.fraction, right.fraction);
		const fraction: Fraction = Math.min(maxFraction, settings.maxFraction);

		const summaryLength = left.value.length + right.value.length;
		if (summaryLength < 15) {
			const friendlyLeft: number = Financial.toFloat(left);
			const friendlyRight: number = Financial.toFloat(right);

			const result: number = friendlyLeft / friendlyRight;

			const stringResult = result.toFixed(fraction + 1).toString();
			const separator = settings.decimalSeparator;
			const splitResult = stringResult.split(separator);
			const value = splitResult[0] + separator + splitResult[1].substr(0, fraction);
			// const value: string = result.toFixed(fraction);
			return Financial.round(Financial.parse(settings, value), maxFraction);
		} else {
			// Use BigInt arithmetic instead
			const bigLeftValue = BigInt(left.value);
			const bigRightValue = BigInt(right.value);

			const lessRightFraction = (left.fraction > right.fraction) ? (left.fraction - right.fraction) : 0;
			const lessleftFraction = (right.fraction > left.fraction) ? (right.fraction - left.fraction) : 0;

			const leftFractionPlus = "1".padEnd(1 + maxFraction + fraction + lessleftFraction, "0");
			const rightFractionPlus = "1".padEnd(1 + maxFraction + lessRightFraction, "0");
			// const leftFractionPlus = "1" + new Array(maxFraction + fraction + lessleftFraction).fill(0).join("");
			// const rightFractionPlus = "1" + new Array(maxFraction + lessRightFraction).fill(0).join("");

			const friendlyLeftValue = bigLeftValue * BigInt(leftFractionPlus);
			const friendlyRightValue = bigRightValue * BigInt(rightFractionPlus);

			const result = friendlyLeftValue / friendlyRightValue;
			return new Financial(result.toString(), fraction);
		}
	}

	public static equals(left: zxteam.Financial, right: zxteam.Financial): boolean {
		if (left.value === right.value && left.fraction === right.fraction) {
			return true;
		} else {
			return false;
		}
	}

	public static fromBigInt(value: BigInt): Financial {
		return new Financial(value.toString(), 0);
	}

	public static fromFloat(value: number, fraction: Fraction): Financial {
		if (!Number.isFinite(value)) { throw new Error("Wrong value. Expected finite float value."); }
		for (let c = 0; c < fraction; ++c) { value *= 10; }
		return new Financial(value.toFixed(0), fraction);
	}

	public static fromInt(value: number): zxteam.Financial {
		if (!Number.isSafeInteger(value)) { throw new Error("Wrong value. Expected safe integer value."); }
		return new Financial(value.toFixed(0), 0);
	}

	public static gt(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (Financial.toFloat(left) > Financial.toFloat(right));
	}

	public static gte(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (Financial.toFloat(left) >= Financial.toFloat(right));
	}

	public static isZero(num: zxteam.Financial): boolean {
		return Financial.equals(num, Financial.ZERO);
	}

	public static lt(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (Financial.toFloat(left) < Financial.toFloat(right));
	}

	public static lte(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (Financial.toFloat(left) <= Financial.toFloat(right));
	}

	public static mod(left: zxteam.Financial, right: zxteam.Financial): Financial {
		if (Financial.isZero(right)) {
			throw new Error("Modulus by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const friendlyLeft: number = Financial.toFloat(left);
		const friendlyRight: number = Financial.toFloat(right);

		const remainder: number = friendlyLeft % friendlyRight;

		const fraction: Fraction = Math.max(left.fraction, right.fraction);
		return Financial.fromFloat(remainder, fraction);
	}

	public static multiply(left: zxteam.Financial, right: zxteam.Financial): Financial {
		// According to ECMA Section 8.5 - Numbers https://www.ecma-international.org/ecma-262/5.1/#sec-8.5
		// IEEE-754 maximum integer value is +/- 9007199254740991

		if (Financial.isZero(right) || Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const summaryLength = left.value.length + right.value.length;
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = Number.parseInt(left.value);
			const friendlyRightValue = Number.parseInt(right.value);
			const result = friendlyLeftValue * friendlyRightValue;
			return new Financial(result.toString(), left.fraction + right.fraction);
		} else {
			// Use BigInt arithmetic instead
			const friendlyLeftValue = BigInt(left.value);
			const friendlyRightValue = BigInt(right.value);

			const result = friendlyLeftValue * friendlyRightValue;
			const value = result.toString();
			const fraction = left.fraction + right.fraction;
			return { value, fraction };
		}
	}

	public static parse(settings: FinancialSettings, value: string): zxteam.Financial {
		const separatorChar = settings.decimalSeparator;
		const argsRegex = /^[+-]?\d+(\.\d+)?$/;
		if (!argsRegex.test(value)) { throw new Error("Invalid financial value. Expected decimal string"); }

		let valueString;
		let valueSplitToArray;

		valueString = value.replace(separatorChar, "");
		valueSplitToArray = value.split(separatorChar);

		const zeroRegex = /^[0]+$/;
		const valueStringClear = zeroRegex.test(valueString) ? "0" : valueString;

		// Calculation fraction
		const friendlyFraction = (valueSplitToArray.length > 1)
			? zeroRegex.test(valueString)
				? 0
				: valueSplitToArray[1].length
			: 0;

		let friendlyValue = valueStringClear;

		// Remove zero
		if ((valueStringClear.startsWith("0") && valueStringClear.length > 1) ||
			valueStringClear.startsWith("-0") && valueStringClear.length > 2) {
			friendlyValue = parseInt(friendlyValue).toString();
		}

		const financalValue = new Financial(friendlyValue, friendlyFraction);

		return { value: financalValue.value, fraction: financalValue.fraction };
	}

	/**
	 * Change fraction value by rounding.
	 * Returns the value of a number rounded to the nearest value with fraction.
	 * An analog Math.round() for JS float
	 */
	public static round(num: zxteam.Financial, fraction: number): Financial {
		if (!Fraction.isFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}

		// if (num.value.length < 16) {
		// 	const multiplier = Number("1".padEnd(fraction + 1, "0"));
		// 	const roundNumber = Math.round(Financial.toFloat(num) * multiplier) / multiplier;
		// 	return Financial.parse(roundNumber.toFixed(fraction));
		// } else {
		// 	// Сейчас делаю.
		// 	const stringNum = Financial.toString(num);
		// 	return {} as any;
		// }

		throw new Error("Not implemented yet");
	}

	public static subtract(left: zxteam.Financial, right: zxteam.Financial): Financial {
		const summaryLength = left.value.length + right.value.length;
		const fraction = Math.max(left.fraction, right.fraction);
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = Financial.toFloat(left);
			const friendlyRightValue = Financial.toFloat(right);
			const result = friendlyLeftValue - friendlyRightValue;
			return Financial.fromFloat(result, fraction);
		} else {
			// Use BigInt arithmetic instead
			const friendlyLeftValue = BigInt(left.value);
			const friendlyRightValue = BigInt(right.value);
			const diffFraction = left.fraction - right.fraction;
			let result: BigInt;
			if (diffFraction > 0) {
				const rightZero = Math.pow(10, diffFraction);
				result = friendlyLeftValue - (friendlyRightValue * BigInt(rightZero));
			} else if (diffFraction < 0) {
				const leftZero = Math.pow(10, Math.abs(diffFraction));
				result = (friendlyLeftValue * BigInt(leftZero)) - friendlyRightValue;
			} else {
				result = friendlyLeftValue - friendlyRightValue;
			}
			return new Financial(result.toString(), fraction);
		}
	}

	public static toFloat(num: zxteam.Financial): number {
		// const string = Financial.toString(num);
		// return parseFloat(string);

		throw new Error("Not implemented yet");
	}

	public static toInt(num: zxteam.Financial): number {
		//return Number.parseInt(Financial.toString(num));

		throw new Error("Not implemented yet");
	}

	public static toString(settings: FinancialSettings, num: zxteam.Financial): string {
		const { value, fraction } = num;
		if (fraction === 0) {
			return num.value;
		} else {
			const separatorChar = settings.decimalSeparator;
			const isNegative = value.length > 0 && value[0] === "-";
			const sign = isNegative ? "-" : "";
			const absoluteValue = isNegative ? value.substr(1) : value;
			const absoluteValueLen = absoluteValue.length;
			if (fraction < absoluteValueLen) {
				const delimerPosition = absoluteValueLen - fraction;
				const wholePart = absoluteValue.substr(0, delimerPosition);
				const fractionPart = absoluteValue.substr(delimerPosition);
				return `${sign}${wholePart}${separatorChar}${fractionPart}`;
			} else {
				const lengthenZeroCount = fraction - absoluteValueLen;
				const lengthenPart = "0".repeat(lengthenZeroCount);
				return `${sign}0${separatorChar}${lengthenPart}${absoluteValue}`;
			}
		}
	}

	/**
	 * Change fraction value by truncate.
	 * Returns the value of a Financial rounded to the nearest Financial with different fraction.
	 * An analog Math.trunc() for JS float
	 */
	public static floor(num: zxteam.Financial, fraction: Fraction): zxteam.Financial {
		Fraction.verifyFraction(fraction);

		// const multiplier = Number("1".padEnd(fraction + 1, "0"));
		// const roundNumber = Math.floor(Financial.toFloat(num) * multiplier) / multiplier;
		// return Financial.parse(roundNumber.toFixed(fraction));

		throw new Error("Not implemented yet");
	}

	/**
	 * Change fraction value by truncate to upper value.
	 * Return the smallest value greater than or equal to a given
	 * An analog Math.ceil() for JS float
	 */
	public static ceil(num: zxteam.Financial, fraction: Fraction): zxteam.Financial {
		if (!Fraction.isFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		const multiplier = Number("1".padEnd(fraction + 1, "0"));
		const roundNumber = Math.ceil(Financial.toFloat(num) * multiplier) / multiplier;
		return Financial.fromFloat(roundNumber, fraction);
	}

	public static trunc(num: zxteam.Financial, fraction: Fraction): zxteam.Financial {
		if (!Fraction.isFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		const multiplier = Number("1".padEnd(fraction + 1, "0"));
		const roundNumber = Math.ceil(Financial.toFloat(num) * multiplier) / multiplier;
		return Financial.fromFloat(roundNumber, fraction);
	}

	public static wrap(num: zxteam.Financial): zxteam.Financial {
		return new Financial(num.value, num.fraction);
	}

	public constructor(value: string, fraction: Fraction) {
		if (!heplers.valueRegExp.test(value)) {
			throw new Error(`Invalid argument 'value' = ${value}. Expected integer number in string representation`);
		}
		Fraction.verifyFraction(fraction);

		if (value === "0") {
			fraction = 0;
		} else {
			while (fraction > 0 && value.length > 1 && value.endsWith("0")) {
				--fraction;
				value = value.substr(0, value.length - 1);
			}
		}

		this.value = value;
		this.fraction = fraction;
	}
}

export function setup(settings: FinancialSettings) {
	const instance: FinancialOperation = Object.freeze({
		abs(num: any): any {
			throw new Error("Not implemented yet");
		},

		add(left: any, right: any): any {
			if (_.isString(left) && _.isString(right)) {
				return Financial.toString(settings, Financial.add(Financial.parse(settings, left), Financial.parse(settings, right)));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.add(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		ceil(num: any, fraction: Fraction): any {
			throw new Error("Not implemented yet");
		},

		divide(left: any, right: any): any {
			if (_.isString(left) && _.isString(right)) {
				return Financial.toString(settings, Financial.divide(settings, Financial.parse(settings, left), Financial.parse(settings, right)));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.divide(settings, left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		equals(left: any, right: any): boolean {
			if (_.isString(left) && _.isString(right)) {
				return Financial.equals(Financial.parse(settings, left), Financial.parse(settings, right));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.equals(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		floor(num: any, fraction: Fraction): any {
			throw new Error("Not implemented yet");
		},

		fromBigInt(value: BigInt): zxteam.Financial {
			return Financial.fromBigInt(value);
		},

		fromFloat(value: number, fractionDigits: number): zxteam.Financial {
			return Financial.fromFloat(value, fractionDigits);
		},

		fromInt(value: number): zxteam.Financial {
			return Financial.fromInt(value);
		},

		gt(left: any, right: any): boolean {
			if (_.isString(left) && _.isString(right)) {
				return Financial.gt(Financial.parse(settings, left), Financial.parse(settings, right));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.gt(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		gte(left: any, right: any): boolean {
			if (_.isString(left) && _.isString(right)) {
				return Financial.gte(Financial.parse(settings, left), Financial.parse(settings, right));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.gte(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		isFinancial: heplers.isFinancial,

		isZero(num: any): boolean {
			if (_.isString(num)) {
				return Financial.isZero(Financial.parse(settings, num));
			} else if (heplers.isFinancial(num)) {
				return Financial.isZero(num);
			}
			throw new Error("Wrong arguments passed");
		},

		lt(left: any, right: any): boolean {
			if (_.isString(left) && _.isString(right)) {
				return Financial.lt(Financial.parse(settings, left), Financial.parse(settings, right));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.lt(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		lte(left: any, right: any): boolean {
			if (_.isString(left) && _.isString(right)) {
				return Financial.lte(Financial.parse(settings, left), Financial.parse(settings, right));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.lte(left, right);
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
			if (_.isString(left) && _.isString(right)) {
				return Financial.toString(settings, Financial.mod(Financial.parse(settings, left), Financial.parse(settings, right)));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.mod(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		multiply(left: any, right: any): any {
			if (_.isString(left) && _.isString(right)) {
				return Financial.toString(settings, Financial.multiply(Financial.parse(settings, left), Financial.parse(settings, right)));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.multiply(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		parse(value: string): zxteam.Financial {
			if (_.isString(value)) {
				return Financial.parse(settings, value);
			}
			throw new Error("Wrong arguments passed");
		},

		round(num: any, fraction: Fraction): any {
			Fraction.verifyFraction(fraction);

			if (_.isString(num) && _.isNumber(fraction)) {
				return Financial.toString(settings, Financial.round(Financial.parse(settings, num), fraction));
			} else if (heplers.isFinancial(num)) {
				return Financial.round(num, fraction);
			}
			throw new Error("Wrong arguments passed");
		},

		subtract(left: any, right: any): any {
			if (_.isString(left) && _.isString(right)) {
				return Financial.toString(settings, Financial.subtract(Financial.parse(settings, left), Financial.parse(settings, right)));
			} else if (heplers.isFinancial(left) && heplers.isFinancial(right)) {
				return Financial.subtract(left, right);
			}
			throw new Error("Wrong arguments passed");
		},

		toFloat(num: zxteam.Financial): number {
			if (heplers.isFinancial(num)) {
				return Financial.toFloat(num);
			}
			throw new Error("Wrong arguments passed");
		},

		toInt(num: zxteam.Financial): number {
			if (heplers.isFinancial(num)) {
				return Financial.toInt(num);
			}
			throw new Error("Wrong arguments passed");
		},

		toString(num: zxteam.Financial): string {
			if (heplers.isFinancial(num)) {
				return Financial.toString(settings, num);
			}
			throw new Error("Wrong arguments passed");
		},

		trunc(num: any, fraction: Fraction): any {
			throw new Error("Not implemented yet");
		}
	});
	return instance;
}
export const DEFAULT_SETTINGS: FinancialSettings = Object.freeze({
	decimalSeparator: ".",
	maxFraction: 32,
	roundMode: FinancialSettings.ROUND_MODE.ROUND
});
export const financial: FinancialOperation = setup(DEFAULT_SETTINGS);
export default financial;
