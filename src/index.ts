import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

const valueRegExp = /^-?(0|[1-9][0-9]*)$/;

function getSeparatorChar(): string {
	// TODO: Detect locale and return correct separator.
	const exampleNum = 1000.01;
	const exampleStr = exampleNum.toLocaleString();
	const separator = exampleStr[exampleStr.length - 3];
	return separator;
}
function getFraction(maxFraction: number): number {
	const defaultFraction = 8;
	return (defaultFraction > maxFraction) ? defaultFraction : maxFraction;
}
function getRoundMode(): ROUND_MODE {
	// TODO
	return ROUND_MODE.ROUND;
}
function switchRound(num: zxteam.Financial, mode: ROUND_MODE): zxteam.Financial {
	const fraction = num.fraction;
	switch (mode) {
		case ROUND_MODE.ROUND:
			return Financial.round(num, getFraction(fraction));
		case ROUND_MODE.TRUNC_DOWN:
			return Financial.truncDown(num, getFraction(fraction));
		case ROUND_MODE.TRUNC_UP:
			return Financial.truncUp(num, getFraction(fraction));
		default:
			throw Error(`Don't support round mode: ${mode}`);
	}
}

export const enum ROUND_MODE {
	TRUNC_UP = "TRUNC_UP",
	TRUNC_DOWN = "TRUNC_DOWN",
	ROUND = "ROUND"
}

export interface FinancialOperation {
	add(left: string, right: string): string;
	add(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	divide(left: string, right: string): string;
	divide(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	equals(left: string, right: string): boolean;
	equals(left: zxteam.Financial, right: zxteam.Financial): boolean;

	fromFloat(value: number, fractionDigits: number): zxteam.Financial;

	fromInt(value: number): zxteam.Financial;

	gt(left: string, right: string): boolean;
	gt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	gte(left: string, right: string): boolean;
	gte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	isFinancial(probablyFinancal: any): probablyFinancal is zxteam.Financial;

	isZero(num: string): boolean;
	isZero(num: zxteam.Financial): boolean;

	lt(left: string, right: string): boolean;
	lt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	lte(left: string, right: string): boolean;
	lte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	mod(left: string, right: string): string;
	mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	multiply(left: string, right: string): string;
	multiply(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	parse(value: string): zxteam.Financial;

	round(num: string, fraction: number): string;
	round(num: zxteam.Financial, fraction: number): zxteam.Financial;

	subtract(left: string, right: string): string;
	subtract(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	toFloat(num: zxteam.Financial): number;

	toInt(num: zxteam.Financial): number;

	toString(num: zxteam.Financial): string;

	truncDown(num: string, fraction: number): string;
	truncDown(num: zxteam.Financial, fraction: number): zxteam.Financial;

	truncUp(num: string, fraction: number): string;
	truncUp(num: zxteam.Financial, fraction: number): zxteam.Financial;

	wrap(num: zxteam.Financial): zxteam.Financial;
}

export class Financial implements zxteam.Financial {
	public static readonly FinancialStringRegExp = /^(-?)(0|[1-9][0-9]*)(\\.[0-9]*[1-9])?$/;
	public static readonly ZERO: zxteam.Financial = Financial.fromInt(0);

	public readonly value: string;
	public readonly fraction: number;

	public static add(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
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

	public static divide(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
		if (Financial.isZero(right)) {
			throw new Error("Division by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const friendlyLeft: number = Financial.toFloat(left);
		const friendlyRight: number = Financial.toFloat(right);

		const result: number = friendlyLeft / friendlyRight;

		const maxFraction: number = Math.max(left.fraction, right.fraction);
		const fraction: number = getFraction(maxFraction);
		const value: string = result.toFixed(fraction);
		return switchRound(Financial.parse(value), getRoundMode());
	}

	public static equals(left: zxteam.Financial, right: zxteam.Financial): boolean {
		if (left.value === right.value && left.fraction === right.fraction) {
			return true;
		} else {
			return false;
		}
	}

	public static fromFloat(value: number, fractionDigits: number): zxteam.Financial {
		if (!Number.isFinite(value)) { throw new Error("Wrong value. Expected finite float value."); }
		for (let c = 0; c < fractionDigits; ++c) { value *= 10; }
		return new Financial(value.toFixed(0), fractionDigits);
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

	public static isFinancial(probablyFinancal: any): probablyFinancal is zxteam.Financial {
		if (typeof probablyFinancal === "object" && "value" in probablyFinancal && "fraction" in probablyFinancal) {
			const { value, fraction } = probablyFinancal;
			if (typeof value === "string" && typeof fraction === "number") {
				if (valueRegExp.test(value)) {
					if (heplers.verifyFraction(fraction)) {
						return true;
					}
				}
			}
		}
		return false;
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

	public static mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
		if (Financial.isZero(right)) {
			throw new Error("Modulus by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const friendlyLeft: number = Financial.toFloat(left);
		const friendlyRight: number = Financial.toFloat(right);

		const remainder: number = friendlyLeft % friendlyRight;

		const fraction: number = Math.max(left.fraction, right.fraction);
		return Financial.fromFloat(remainder, fraction);
	}

	public static multiply(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
		// According to ECMA Section 8.5 - Numbers https://www.ecma-international.org/ecma-262/5.1/#sec-8.5
		// IEEE-754 maximum integer value is +/- 9007199254740991

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
			return new Financial(result.toString(), left.fraction + right.fraction);
		}

	}

	public static parse(value: string): zxteam.Financial {
		const separatorChar = getSeparatorChar();
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
	public static round(num: zxteam.Financial, fraction: number): zxteam.Financial {
		if (!heplers.verifyFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		const multiplier = Number("1".padEnd(fraction + 1, "0"));
		const roundNumber = Math.round(Financial.toFloat(num) * multiplier) / multiplier;
		return Financial.parse(roundNumber.toFixed(fraction));
	}

	public static subtract(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
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
		const string = Financial.toString(num);
		return parseFloat(string);
	}

	public static toInt(num: zxteam.Financial): number {
		return Number.parseInt(Financial.toString(num));
	}

	public static toString(num: zxteam.Financial): string {
		const { value, fraction } = num;
		if (fraction === 0) {
			return num.value;
		} else {
			const separatorChar = getSeparatorChar();
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
	public static truncDown(num: zxteam.Financial, fraction: number): zxteam.Financial {
		if (!heplers.verifyFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		const multiplier = Number("1".padEnd(fraction + 1, "0"));
		const roundNumber = Math.floor(Financial.toFloat(num) * multiplier) / multiplier;
		return Financial.fromFloat(roundNumber, fraction);
	}

	/**
	 * Change fraction value by truncate to upper value.
	 * Return the smallest value greater than or equal to a given
	 * An analog Math.ceil() for JS float
	 */
	public static truncUp(num: zxteam.Financial, fraction: number): zxteam.Financial {
		if (!heplers.verifyFraction(fraction)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		const multiplier = Number("1".padEnd(fraction + 1, "0"));
		const roundNumber = Math.ceil(Financial.toFloat(num) * multiplier) / multiplier;
		return Financial.fromFloat(roundNumber, fraction);
	}

	public static wrap(num: zxteam.Financial): zxteam.Financial {
		return new Financial(num.value, num.fraction);
	}

	public constructor(value: string, fraction: number) {
		if (!valueRegExp.test(value)) {
			throw new Error(`Invalid argument 'value' = ${value}. Expected integer number in string representation`);
		}
		if (!Number.isInteger(fraction) || fraction < 0) {
			throw new Error(`Invalid argument 'fraction' = ${fraction}. Expected integer number >= 0.`);
		}

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

	// public get value(): string { return this._value; }
	// public get fraction(): number { return this._fraction; }

	public toString(): string {
		return Financial.toString(this);
	}
}

export const financial: FinancialOperation = Object.freeze({
	add(left: any, right: any): any {
		if (_.isString(left) && _.isString(right)) {
			return Financial.toString(Financial.add(Financial.parse(left), Financial.parse(right)));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.add(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	divide(left: any, right: any): any {
		if (_.isString(left) && _.isString(right)) {
			return Financial.toString(Financial.divide(Financial.parse(left), Financial.parse(right)));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.divide(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	equals(left: any, right: any): boolean {
		if (_.isString(left) && _.isString(right)) {
			return Financial.equals(Financial.parse(left), Financial.parse(right));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.equals(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	fromFloat(value: number, fractionDigits: number): zxteam.Financial {
		return Financial.fromFloat(value, fractionDigits);
	},

	fromInt(value: number): zxteam.Financial {
		return Financial.fromInt(value);
	},

	gt(left: any, right: any): boolean {
		if (_.isString(left) && _.isString(right)) {
			return Financial.gt(Financial.parse(left), Financial.parse(right));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.gt(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	gte(left: any, right: any): boolean {
		if (_.isString(left) && _.isString(right)) {
			return Financial.gte(Financial.parse(left), Financial.parse(right));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.gte(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	isFinancial(probablyFinancal: any): probablyFinancal is zxteam.Financial {
		return Financial.isFinancial(probablyFinancal);
	},

	isZero(num: any): boolean {
		if (_.isString(num)) {
			return Financial.isZero(Financial.parse(num));
		} else if (Financial.isFinancial(num)) {
			return Financial.isZero(num);
		}
		throw new Error("Wrong arguments passed");
	},

	lt(left: any, right: any): boolean {
		if (_.isString(left) && _.isString(right)) {
			return Financial.lt(Financial.parse(left), Financial.parse(right));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.lt(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	lte(left: any, right: any): boolean {
		if (_.isString(left) && _.isString(right)) {
			return Financial.lte(Financial.parse(left), Financial.parse(right));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.lte(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	mod(left: any, right: any): any {
		if (_.isString(left) && _.isString(right)) {
			return Financial.toString(Financial.mod(Financial.parse(left), Financial.parse(right)));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.mod(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	multiply(left: any, right: any): any {
		if (_.isString(left) && _.isString(right)) {
			return Financial.toString(Financial.multiply(Financial.parse(left), Financial.parse(right)));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.multiply(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	parse(value: string): zxteam.Financial {
		if (_.isString(value)) {
			return Financial.parse(value);
		}
		throw new Error("Wrong arguments passed");
	},

	round(num: any, fraction: number): any {
		if (_.isString(num) && _.isNumber(fraction)) {
			return Financial.toString(Financial.round(Financial.parse(num), fraction));
		} else if (Financial.isFinancial(num) && _.isNumber(fraction)) {
			return Financial.round(num, fraction);
		}
		throw new Error("Wrong arguments passed");
	},

	subtract(left: any, right: any): any {
		if (_.isString(left) && _.isString(right)) {
			return Financial.toString(Financial.subtract(Financial.parse(left), Financial.parse(right)));
		} else if (Financial.isFinancial(left) && Financial.isFinancial(right)) {
			return Financial.subtract(left, right);
		}
		throw new Error("Wrong arguments passed");
	},

	toFloat(num: zxteam.Financial): number {
		if (Financial.isFinancial(num)) {
			return Financial.toFloat(num);
		}
		throw new Error("Wrong arguments passed");
	},

	toInt(num: zxteam.Financial): number {
		if (Financial.isFinancial(num)) {
			return Financial.toInt(num);
		}
		throw new Error("Wrong arguments passed");
	},

	toString(num: zxteam.Financial): string {
		if (Financial.isFinancial(num)) {
			return Financial.toString(num);
		}
		throw new Error("Wrong arguments passed");
	},

	truncDown(num: any, fraction: number): any {
		if (_.isString(num) && _.isNumber(fraction)) {
			return Financial.toString(Financial.truncDown(Financial.parse(num), fraction));
		} else if (Financial.isFinancial(num) && _.isNumber(fraction)) {
			return Financial.truncDown(num, fraction);
		}
		throw new Error("Wrong arguments passed");
	},

	truncUp(num: any, fraction: number): any {
		if (_.isString(num) && _.isNumber(fraction)) {
			return Financial.toString(Financial.truncUp(Financial.parse(num), fraction));
		} else if (Financial.isFinancial(num) && _.isNumber(fraction)) {
			return Financial.truncUp(num, fraction);
		}
		throw new Error("Wrong arguments passed");
	},

	wrap(num: zxteam.Financial): zxteam.Financial {
		if (Financial.isFinancial(num)) {
			return Financial.wrap(num);
		}
		throw new Error("Wrong arguments passed");
	}
});
export default financial;

namespace heplers {
	export function verifyFraction(fraction: number): boolean {
		if (Number.isSafeInteger(fraction) && fraction >= 0) {
			return true;
		} else {
			return false;
		}
	}
}
