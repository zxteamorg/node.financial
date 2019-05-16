import * as zxteam from "@zxteam/contract";

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
function getDefaultRound(num: Financial, fraction: number): zxteam.Financial {
	return Financial.round(num, fraction);
}

export const enum ROUND_MODE {
	TRUNC_UP = "TRUNC_UP",
	TRUNC_DOWN = "TRUNC_DOWN",
	ROUND = "ROUND"
}


export class Financial implements zxteam.Financial {
	public static readonly FinancialStringRegExp = /^(-?)(0|[1-9][0-9]*)(\\.[0-9]*[1-9])?$/;
	public static readonly ZERO: zxteam.Financial = Financial.fromInt(0);

	private readonly _value: string;
	private readonly _fraction: number;

	public static add(left: zxteam.Financial, right: zxteam.Financial): Financial {
		const maxFraction = (left.fraction >= right.fraction) ? left.fraction : right.fraction;

		const leftValue = (left.fraction !== 0)
			? (maxFraction === left.fraction)
				? left.value
				: left.value + new Array(maxFraction - left.fraction).fill(0).join("")
			: left.value + "" + new Array(maxFraction).fill(0).join("");

		const rightValue = (right.fraction !== 0)
			? (maxFraction === right.fraction)
				? right.value
				: right.value + new Array(maxFraction - right.fraction).fill(0).join("")
			: right.value + "" + new Array(maxFraction).fill(0).join("");

		const leftValueArray = leftValue.split("");
		const rightValueArray = rightValue.split("");

		const friendlyValue: Array<string> = [];

		if (leftValue.startsWith("-") || rightValue.startsWith("-")) {
			const leftMinus: zxteam.Financial
				= (leftValue.startsWith("-"))
					? { value: leftValue.slice(1), fraction: maxFraction }
					: { value: leftValue, fraction: maxFraction };

			const rightMinus: zxteam.Financial
				= (rightValue.startsWith("-"))
					? { value: rightValue.slice(1), fraction: maxFraction }
					: { value: rightValue, fraction: maxFraction };
			const result = Financial.subtract(leftMinus, rightMinus);
			const valueMinus = (result.value.startsWith("-")) ? result.value.slice(1) : "-" + result.value;
			const fractionMinus = result.fraction;
			return Financial.wrap({ value: valueMinus, fraction: fractionMinus });

		}

		const countInt = (leftValueArray.length >= rightValueArray.length) ? leftValueArray.length : rightValueArray.length;
		let bit: number = 0;
		for (let i = 0; i < countInt; i++) {

			const leftNum = leftValueArray.splice(-1, 1)[0];
			const rightNum = rightValueArray.splice(-1, 1)[0];

			if (rightNum === undefined) {
				const num = (parseInt(leftNum) + bit).toString();
				if (num.length === 1) {
					friendlyValue.unshift(num);
					bit = 0;
					continue;
				} else {
					friendlyValue.unshift(num[1]);
					bit = parseInt(num[0]);
					continue;
				}
			}
			const sumNum = parseInt(leftNum) + bit + parseInt(rightNum);

			if (sumNum > 9) {
				const spliceNum = sumNum.toString().split("");
				friendlyValue.unshift(spliceNum[1]);
				bit = parseInt(spliceNum[0]);
			} else {
				friendlyValue.unshift(sumNum.toString());
				bit = 0;
			}
		}

		if (bit) {
			friendlyValue.unshift(bit.toString());
		}
		const value = friendlyValue.join("");
		const xfinancial = { value, fraction: maxFraction };
		return Financial.wrap(xfinancial);
	}
	public static equals(left: zxteam.Financial, right: zxteam.Financial): boolean {
		if (left.value === right.value && left.fraction === right.fraction) {
			return true;
		} else {
			return false;
		}
	}
	public static fromFloat(value: number, fractionDigits: number): Financial {
		if (!Number.isFinite(value)) { throw new Error("Wrong value. Expected finite float value."); }
		for (let c = 0; c < fractionDigits; ++c) { value *= 10; }
		return new Financial(value.toFixed(0), fractionDigits);
	}
	public static fromInt(value: number): Financial {
		if (!Number.isSafeInteger(value)) { throw new Error("Wrong value. Expected safe integer value."); }
		return new Financial(value.toFixed(0), 0);
	}
	public static gt(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (financial(left).toFloat() > financial(right).toFloat());
	}
	public static gte(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (financial(left).toFloat() >= financial(right).toFloat());
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
	public static mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
		if (Financial.isZero(right)) {
			throw new Error("Modulus by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const friendlyLeft: number = Financial.wrap(left).toFloat();
		const friendlyRight: number = Financial.wrap(right).toFloat();

		const remainder: number = friendlyLeft % friendlyRight;

		const fraction: number = Math.max(left.fraction, right.fraction);
		return Financial.fromFloat(remainder, fraction);
	}
	public static lt(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (financial(left).toFloat() < financial(right).toFloat());
	}
	public static lte(left: zxteam.Financial, right: zxteam.Financial): boolean {
		return (financial(left).toFloat() <= financial(right).toFloat());
	}
	public static parse(num: string): Financial {
		return financial(num);
	}
	/**
	 * @deprecated Use add() instead
	 */
	public static plus(left: zxteam.Financial, right: zxteam.Financial): Financial { return Financial.add(left, right); }
	/**
	 * @deprecated Use subtract() instead
	 */
	public static minus(left: zxteam.Financial, right: zxteam.Financial): Financial { return Financial.subtract(left, right); }
	public static multiply(left: zxteam.Financial, right: zxteam.Financial): Financial {
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
	public static divide(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial {
		if (Financial.isZero(right)) {
			throw new Error("Division by zero");
		} else if (Financial.isZero(left)) {
			return Financial.ZERO;
		}

		const friendlyLeft: number = Financial.wrap(left).toFloat();
		const friendlyRight: number = Financial.wrap(right).toFloat();

		const result: number = friendlyLeft / friendlyRight;

		const maxFraction: number = Math.max(left.fraction, right.fraction);
		const fraction: number = getFraction(maxFraction);
		const value: string = result.toFixed(fraction);
		return getDefaultRound(financial(value), fraction);
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
		const roundNumber = Math.round(financial(num).toFloat() * multiplier) / multiplier;
		return financial(roundNumber.toFixed(fraction));
	}
	public static subtract(left: zxteam.Financial, right: zxteam.Financial): Financial {
		const maxFraction = (left.fraction >= right.fraction) ? left.fraction : right.fraction;

		const leftValue = (left.fraction !== 0)
			? (maxFraction === left.fraction)
				? left.value
				: left.value + new Array(maxFraction - left.fraction).fill(0).join("")
			: left.value + "" + new Array(maxFraction).fill(0).join("");

		const rightValue = (right.fraction !== 0)
			? (maxFraction === right.fraction)
				? right.value
				: right.value + new Array(maxFraction - right.fraction).fill(0).join("")
			: right.value + "" + new Array(maxFraction).fill(0).join("");

		const leftValueArray = leftValue.split("");
		const rightValueArray = rightValue.split("");

		let isMinus = false;
		if (leftValueArray.length < rightValueArray.length) {
			isMinus = true;
		}

		const countInt = (leftValueArray.length >= rightValueArray.length) ? leftValueArray.length : rightValueArray.length;

		const friendlyValue: Array<string> = [];

		if (leftValue.startsWith("-")) {
			const leftMinus: zxteam.Financial
				= (leftValue.startsWith("-"))
					? { value: leftValue.slice(1), fraction: left.fraction }
					: { value: leftValue, fraction: left.fraction };

			const rightMinus: zxteam.Financial
				= (rightValue.startsWith("-"))
					? { value: rightValue.slice(1), fraction: right.fraction }
					: { value: rightValue, fraction: right.fraction };
			const result = Financial.plus(leftMinus, rightMinus);
			const valueMinus = "-" + result.value;
			const fractionMinus = result.fraction;
			return Financial.wrap({ value: valueMinus, fraction: fractionMinus });
		}
		let nextBit: number = 0;
		for (let i = 0; i < countInt; i++) {
			let bit: number = nextBit;

			let leftNum = leftValueArray.splice(-1, 1)[0];
			let rightNum = rightValueArray.splice(-1, 1)[0];

			if (parseInt(leftNum) < parseInt(rightNum) && leftValueArray.length > 0) {
				leftNum = "1" + leftNum;
				nextBit = 1;
			}

			if (leftNum === undefined) {
				if (friendlyValue[0].startsWith("-")) { continue; }
				friendlyValue.unshift(rightNum);
				continue;
			}
			if (rightNum === undefined) {
				let num;
				if (bit) {
					if (parseInt(leftNum) === 0) {
						num = parseInt("1" + leftNum) - 1;
						friendlyValue.unshift(num.toString());
						nextBit = 1;
						continue;
					} else {
						num = parseInt(leftNum) - 1;
						friendlyValue.unshift(num.toString());
						nextBit = 0;
						continue;
					}
				} else {
					friendlyValue.unshift(leftNum.toString());
					continue;
				}
			}

			if (leftNum === "0" && bit) {
				leftNum = (10).toString();
			}
			const minusPartLeft = parseInt(leftNum) - bit;
			if (minusPartLeft === 0) { friendlyValue.unshift(rightNum); nextBit = 0; continue; }

			const sumNum = (minusPartLeft - parseInt(rightNum)).toString();

			if (sumNum.startsWith("-")) {
				friendlyValue.unshift(sumNum.toString());
				nextBit = 0;
			} else {
				friendlyValue.unshift(sumNum.toString());
			}
		}


		let value = friendlyValue.join("");
		while (value[0] === "0" && value.length > 1) {
			value = value.slice(1);
		}
		if (isMinus && !value.startsWith("-")) {
			value = "-" + value;
		}

		const xfinancial = { value, fraction: maxFraction };
		return Financial.wrap(xfinancial);
	}
	public static toFloat(num: zxteam.Financial): number {
		const string = Financial.toString(num);
		return parseFloat(string);
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
		const roundNumber = Math.floor(financial(num).toFloat() * multiplier) / multiplier;
		return financial(roundNumber, fraction);
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
		const roundNumber = Math.ceil(financial(num).toFloat() * multiplier) / multiplier;
		return financial(roundNumber, fraction);
	}
	public static toInt(num: zxteam.Financial): number {
		return parseInt(num.toString());
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
	public static wrap(num: zxteam.Financial): Financial {
		return financial(num);
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

		this._value = value;
		this._fraction = fraction;
	}

	public get value(): string { return this._value; }
	public get fraction(): number { return this._fraction; }

	public equalsTo(num: zxteam.Financial): boolean {
		return Financial.equals(this, num);
	}
	public toFloat(): number {
		return Financial.toFloat(this);
	}
	public toInt(): number {
		return Financial.toInt(this);
	}
	public toString(): string {
		return Financial.toString(this);
	}
}

export function financial(wrap: zxteam.Financial): Financial;
export function financial(value: number, fractionDigits: number): Financial;
export function financial(value: string): Financial;
export function financial(...args: Array<any>): Financial {

	const separatorChar = getSeparatorChar();

	if (args.length === 1) {
		const value = args[0];

		if (typeof (value) === "object" && typeof (value.value) === "string" && typeof (value.fraction) === "number") {
			// Implementation of financial(wrap: zxteam.Financial): Financial;
			const friendlyValue: zxteam.Financial = value;
			return new Financial(friendlyValue.value, friendlyValue.fraction);
		} else if (typeof (value) === "string") {
			// Implementation of financial(value: string): Financial;
			const argsRegex = /^[+-]?\d+(\.\d+)?$/;
			if (!argsRegex.test(value)) { throw new Error("Invalid financial value. Expected decimal string"); }

			let stringValue;
			let arrayValue;

			stringValue = value.replace(separatorChar, "");
			arrayValue = value.split(separatorChar);

			const zeroRegex = /^[0]+$/;
			const stringValueF = zeroRegex.test(stringValue) ? "0" : stringValue;
			const fraction = (arrayValue.length > 1)
				? zeroRegex.test(stringValue)
					? 0
					: arrayValue[1].length
				: 0;

			let xValue = stringValueF;
			if ((stringValueF.startsWith("0") && stringValueF.length > 1) ||
				stringValueF.startsWith("-0") && stringValueF.length > 2) {
				xValue = parseInt(xValue).toString();
			}
			return new Financial(xValue, fraction);
		}
	}
	if (args.length === 2) {
		const value = args[0];
		const fraction = args[1];
		if (typeof value === "number" && typeof fraction === "number") {
			if (Number.isSafeInteger && fraction === 0) {
				return Financial.fromInt(value);
			}

			const splitValue = (value.toString().lastIndexOf("e") > -1)
				? value.toFixed(fraction).split(separatorChar)
				: value.toString().split(separatorChar);

			const actualFraction = (splitValue.length > 1) ? splitValue[1].length : 0;
			const correctFraction = (actualFraction <= fraction) ? actualFraction : fraction;
			const diffFraction = actualFraction - fraction;

			const fixedNum = (diffFraction > 0)
				? value.toString().slice(0, -(actualFraction - fraction))
				: value.toFixed(correctFraction);

			let friendlyNum = fixedNum.replace(separatorChar, "");

			if (friendlyNum[0] === "-") {
				while (friendlyNum[1] === "0" && friendlyNum.length > 1) {
					friendlyNum = (-friendlyNum.slice(1)).toString();
				}
			} else if (friendlyNum[0] === "0") {
				while (friendlyNum[0] === "0" && friendlyNum.length > 1) {
					friendlyNum = friendlyNum.slice(1);
				}
			}

			return new Financial(friendlyNum, correctFraction);
		}
	}
	throw new Error("Unknown argument(s): " + args.join(", "));
}
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
