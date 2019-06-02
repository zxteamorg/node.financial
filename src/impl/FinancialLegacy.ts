import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";
import { Settings, Financial } from "../contract";
import * as heplers from "../heplers";
import { Fraction } from "../Fraction";

export class FinancialLegacy implements Financial {
	public static readonly FinancialStringRegExp = /^(-?)(0|[1-9][0-9]*)(\\.[0-9]*[1-9])?$/;
	//public static readonly ZERO: FinancialLegacy = FinancialLegacy.fromInt(0);

	/**
	 * "+" - for positive values
	 * "-" - for negative values
	 * null - for ZERO
	 */
	public readonly sign: "+" | "-" | null;

	/**
	 * Whole part of number in string format
	 * RegExp: ^(0|[1-9][0-9]*)$
	 */
	public readonly whole: string;

	/**
	 * Fractional part of number in string format
	 * RegExp: ^(0|[1-9][0-9]*)$
	 */
	public readonly fractional: string;


	public readonly value: string;
	public readonly fraction: Fraction;

	private readonly _settings: Settings;

	public static abs(num: any): any {
		throw new Error("Not implemented yet");
	}

	public static add(settins: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
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

			return new FinancialLegacy(settins, result.toString(), fraction);
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

			return new FinancialLegacy(settins, result.toString(), fraction);
		}
	}

	public static divide(settings: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		if (FinancialLegacy.isZero(right)) {
			throw new Error("Division by zero");
		} else if (FinancialLegacy.isZero(left)) {
			return new FinancialLegacy(settings, "0", 0);
		}

		const maxFraction: number = Math.max(left.fraction, right.fraction);
		const fraction: Fraction = Math.max(maxFraction, settings.defaultRoundOpts.fractionalDigits);

		const summaryLength = left.value.length + right.value.length;
		if (summaryLength < 15) {
			const friendlyLeft: number = FinancialLegacy.toFloat(left);
			const friendlyRight: number = FinancialLegacy.toFloat(right);

			const result: number = friendlyLeft / friendlyRight;

			const stringResult = result.toFixed(settings.defaultRoundOpts.fractionalDigits + 1).toString();
			const separator = settings.decimalSeparator;
			const splitResult = stringResult.split(separator);
			const value = splitResult[0] + separator + splitResult[1].substr(0, settings.defaultRoundOpts.fractionalDigits);
			// const value: string = result.toFixed(settings.defaultRoundOpts.fractionalDigits);
			return FinancialLegacy.round(settings,
				FinancialLegacy.parse(settings, value), settings.defaultRoundOpts.fractionalDigits, settings.defaultRoundOpts.roundMode
			);
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
			return new FinancialLegacy(settings, result.toString(), fraction);
		}
	}

	public static equals(left: FinancialLegacy, right: FinancialLegacy): boolean {
		if (left.value === right.value && left.fraction === right.fraction) {
			return true;
		} else {
			return false;
		}
	}

	public static fromBigInt(settings: Settings, value: BigInt): FinancialLegacy {
		return new FinancialLegacy(settings, value.toString(), 0);
	}

	public static fromFloat(settings: Settings, value: number, fraction: Fraction): FinancialLegacy {
		if (!Number.isFinite(value)) { throw new Error("Wrong value. Expected finite float value."); }
		for (let c = 0; c < fraction; ++c) { value *= 10; }
		return new FinancialLegacy(settings, value.toFixed(0), fraction);
	}

	public static fromInt(settings: Settings, value: number): FinancialLegacy {
		if (!Number.isSafeInteger(value)) { throw new Error("Wrong value. Expected safe integer value."); }
		return new FinancialLegacy(settings, value.toFixed(0), 0);
	}

	public static gt(left: FinancialLegacy, right: FinancialLegacy): boolean {
		return (FinancialLegacy.toFloat(left) > FinancialLegacy.toFloat(right));
	}

	public static gte(left: FinancialLegacy, right: FinancialLegacy): boolean {
		return (FinancialLegacy.toFloat(left) >= FinancialLegacy.toFloat(right));
	}

	public static isZero(num: FinancialLegacy): boolean {
		return num.sign === null;
	}

	public static lt(left: FinancialLegacy, right: FinancialLegacy): boolean {
		return (FinancialLegacy.toFloat(left) < FinancialLegacy.toFloat(right));
	}

	public static lte(left: FinancialLegacy, right: FinancialLegacy): boolean {
		return (FinancialLegacy.toFloat(left) <= FinancialLegacy.toFloat(right));
	}

	public static max(settins: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		throw new Error();
	}
	public static min(settins: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		throw new Error();
	}

	public static mod(settins: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		if (FinancialLegacy.isZero(right)) {
			throw new Error("Modulus by zero");
		} else if (FinancialLegacy.isZero(left)) {
			return new FinancialLegacy(settins, "0", 0);
		}

		const friendlyLeft: number = FinancialLegacy.toFloat(left);
		const friendlyRight: number = FinancialLegacy.toFloat(right);

		const remainder: number = friendlyLeft % friendlyRight;

		const fraction: Fraction = Math.max(left.fraction, right.fraction);
		return FinancialLegacy.fromFloat(settins, remainder, fraction);
	}

	public static multiply(settings: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		// According to ECMA Section 8.5 - Numbers https://www.ecma-international.org/ecma-262/5.1/#sec-8.5
		// IEEE-754 maximum integer value is +/- 9007199254740991

		if (FinancialLegacy.isZero(right) || FinancialLegacy.isZero(left)) {
			return new FinancialLegacy(settings, "0", 0);
		}

		const summaryLength = left.value.length + right.value.length;
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = Number.parseInt(left.value);
			const friendlyRightValue = Number.parseInt(right.value);
			const result = friendlyLeftValue * friendlyRightValue;
			return new FinancialLegacy(settings, result.toString(), left.fraction + right.fraction);
		} else {
			// Use BigInt arithmetic instead
			const friendlyLeftValue = BigInt(left.value);
			const friendlyRightValue = BigInt(right.value);

			const result = friendlyLeftValue * friendlyRightValue;
			const value = result.toString();
			const fraction = left.fraction + right.fraction;
			return new FinancialLegacy(settings, value, fraction);
		}
	}

	public static parse(settings: Settings, value: string): FinancialLegacy {
		const separatorChar = settings.decimalSeparator;
		const argsRegex = /^[+-]?\d+(\.\d+)?$/;
		if (!argsRegex.test(value)) {
			throw new Error("Invalid financial value. Expected decimal string");
		}

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

		return new FinancialLegacy(settings, friendlyValue, friendlyFraction);
	}

	/**
	 * Change fraction value by rounding.
	 * Returns the value of a number rounded to the nearest value with fraction.
	 * An analog Math.round() for JS float
	 */
	public static round(settings: Settings, num: FinancialLegacy, fraction: number, mode: zxteam.Financial.RoundMode): FinancialLegacy {
		Fraction.verifyFraction(fraction);

		switch (mode) {
			case zxteam.Financial.RoundMode.Ceil: return FinancialLegacy.ceil(settings, num, fraction);
			case zxteam.Financial.RoundMode.Floor: return FinancialLegacy.floor(settings, num, fraction);
			case zxteam.Financial.RoundMode.Round: break;
			case zxteam.Financial.RoundMode.Trunc: return FinancialLegacy.trunc(settings, num, fraction);
			default: throw new heplers.UnreachableRoundMode(mode);
		}

		if (num.fraction <= fraction) { return new FinancialLegacy(settings, num.value, num.fraction); }

		const newDecimalPart = num.fractional.substr(0, fraction);
		const roundSymbol = Number.parseInt(num.fractional.substr(fraction, 1));
		if (fraction === 0) {
			if (roundSymbol === 5) {
				// We need one more symbol
				if (heplers.isNegative(num)) {
					if (num.fractional.length === 1) {
						return new FinancialLegacy(
							settings,
							num.whole,
							0
						);
					} else {
						const ceilWholePart = BigInt(num.whole) + 1n;
						return new FinancialLegacy(
							settings,
							ceilWholePart.toString(),
							fraction
						);
					}
				} else {
					const ceilWholePart = BigInt(num.whole) + 1n;
					return new FinancialLegacy(
						settings,
						ceilWholePart.toString(),
						fraction
					);
				}
			} else if (roundSymbol > 5) {
				const ceilWholePart = BigInt(num.whole) + 1n;
				return new FinancialLegacy(
					settings,
					ceilWholePart.toString(),
					fraction
				);
			} else {
				return new FinancialLegacy(
					settings,
					num.whole,
					0
				);
			}
		} else {
			if (roundSymbol === 5) {
				// We need one more symbol
				if (heplers.isNegative(num) && num.fractional.length === fraction + 1) {
					return new FinancialLegacy(
						settings,
						heplers.concatValue(num.whole, newDecimalPart.toString()),
						fraction
					);
				} else {
					const ceilDecimalPart = (BigInt(newDecimalPart) + 1n).toString();
					if (ceilDecimalPart.length < newDecimalPart.length) {
						return new FinancialLegacy(
							settings,
							heplers.concatValue(num.whole, heplers.trimStartZeros(ceilDecimalPart)),
							fraction
						);
					} else if (ceilDecimalPart.length === newDecimalPart.length) {
						return new FinancialLegacy(
							settings,
							heplers.concatValue(num.whole, ceilDecimalPart),
							fraction
						);
					} else {
						const ceilWholePart = (BigInt(num.whole) + 1n).toString();
						return new FinancialLegacy(
							settings,
							heplers.concatValue(ceilWholePart, "0"),
							fraction
						);
					}
				}
			} else if (roundSymbol > 5) {
				const ceilDecimalPart = (BigInt(newDecimalPart) + 1n).toString();
				if (ceilDecimalPart.length <= newDecimalPart.length) {
					return new FinancialLegacy(
						settings,
						heplers.concatValue(num.whole, ceilDecimalPart),
						fraction
					);
				} else {
					const ceilWholePart = (BigInt(num.whole) + 1n).toString();
					return new FinancialLegacy(
						settings,
						heplers.concatValue(ceilWholePart, "0"),
						fraction
					);
				}
			} else {
				return new FinancialLegacy(
					settings,
					heplers.trimStartZeros(heplers.concatValue(num.whole, newDecimalPart.toString())),
					fraction
				);
			}
		}
	}

	public static subtract(settins: Settings, left: FinancialLegacy, right: FinancialLegacy): FinancialLegacy {
		const summaryLength = left.value.length + right.value.length;
		const fraction = Math.max(left.fraction, right.fraction);
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = FinancialLegacy.toFloat(left);
			const friendlyRightValue = FinancialLegacy.toFloat(right);
			const result = friendlyLeftValue - friendlyRightValue;
			return FinancialLegacy.fromFloat(settins, result, fraction);
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
			return new FinancialLegacy(settins, result.toString(), fraction);
		}
	}

	public static toFloat(num: FinancialLegacy): number {
		//const parts = heplers.splitParts(num);

		// const wholePart: number = Number.parseInt(parts.wholePart);
		// const decimalPart: number = Number.parseInt(parts.decimalPart);

		// if (Number.isSafeInteger(wholePart) && Number.isSafeInteger(decimalPart)) {
		// 	const powDelimer = Math.pow(10, parts.decimalPart.length);
		// 	const result = wholePart + decimalPart / powDelimer;
		// }
		if (num.sign === "-") {
			return Number.parseFloat(`-${num.whole}.${num.fractional}`);
		}
		return Number.parseFloat(`${num.whole}.${num.fractional}`);
	}

	public static toInt(settins: Settings, num: FinancialLegacy): number {
		const wholePart: number = Number.parseInt(num.whole);

		if (!Number.isInteger(wholePart)) {
			throw new Error("Overflow. The value cannot represent as Integer.");
		}

		return wholePart;
	}

	public static toString(settings: Settings, num: FinancialLegacy): string {
		const { value, fraction } = num;
		if (fraction === 0) {
			return num.value;
		} else {
			const separatorChar = ".";
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
	 * Returns the value of a FinancialLegacy rounded to the nearest FinancialLegacy with different fraction.
	 * An analog Math.trunc() for JS float
	 */
	public static floor(settings: Settings, num: FinancialLegacy, fraction: Fraction): FinancialLegacy {
		Fraction.verifyFraction(fraction);

		if (num.fraction === fraction) { return new FinancialLegacy(settings, num.value, fraction); }

		//const parts = heplers.splitParts(num);

		let newDecimalPart: string;
		let roundSymbol: string;
		if (num.fraction > fraction) {
			newDecimalPart = num.fractional.substr(0, fraction);
			roundSymbol = num.fractional.substr(fraction, 1);
		} else {
			newDecimalPart = num.fractional.padEnd(fraction - num.fraction, "0");
			roundSymbol = "0";
		}

		if (roundSymbol === "0") {
			return new FinancialLegacy(
				settings,
				`${num.sign}${num.whole}${newDecimalPart}`,
				fraction
			);
		} else {
			const ceilWholePart = BigInt(num.whole) - 1n;
			return new FinancialLegacy(
				settings,
				`${num.sign}${ceilWholePart}${newDecimalPart}`,
				fraction
			);
		}
	}

	/**
	 * Change fraction value by truncate to upper value.
	 * Return the smallest value greater than or equal to a given
	 * An analog Math.ceil() for JS float
	 */
	public static ceil(settings: Settings, num: FinancialLegacy, fraction: Fraction): FinancialLegacy {
		Fraction.verifyFraction(fraction);

		if (num.fraction <= fraction) { return num; }

		//const parts = heplers.splitParts(num);

		let newDecimalPart: string;
		let roundSymbol: string;

		newDecimalPart = num.fractional.substr(0, fraction);
		roundSymbol = num.fractional.substr(fraction, 1);

		if (roundSymbol === "0") {
			return new FinancialLegacy(
				settings,
				heplers.concatValue(num.whole, newDecimalPart),
				fraction
			);
		} else {
			const ceilWholePart = BigInt(num.whole) + 1n;
			return new FinancialLegacy(
				settings,
				`${num.sign}${ceilWholePart}${newDecimalPart}`,
				fraction
			);
		}
	}

	public static trunc(settings: Settings, num: FinancialLegacy, fraction: Fraction): FinancialLegacy {
		Fraction.verifyFraction(fraction);

		if (num.fraction === fraction) { return num; }

		if (num.fraction > fraction) {
			const newDecimalPart = num.fractional.substr(0, fraction);
			const legacyNum = heplers.trimStartZeros(heplers.concatValue(num.whole, newDecimalPart));
			return new FinancialLegacy(
				settings,
				num.sign === "-" ? `-${legacyNum}` : legacyNum,
				fraction
			);
		} else {
			const newDecimalPart = num.fractional.padEnd(fraction, "0");
			const legacyNum = heplers.trimStartZeros(heplers.concatValue(num.whole, newDecimalPart));
			return new FinancialLegacy(
				settings,
				num.sign === "-" ? `-${legacyNum}` : legacyNum,
				fraction
			);
		}
	}

	public static wrap(settings: Settings, num: zxteam.Financial): FinancialLegacy {
		if (num.sign === "-") {
			return FinancialLegacy.parse(settings, `-${num.whole}.${num.fractional}`);
		}

		return FinancialLegacy.parse(settings, `${num.whole}.${num.fractional}`);
	}

	public constructor(settings: Settings, value: string, fraction: Fraction) {
		this._settings = settings;
		if (!heplers.valueRegExp.test(value)) {
			throw new Error(`Invalid argument 'value' = ${value}. Expected integer number in string representation`);
		}
		Fraction.verifyFraction(fraction);

		if (value === "0") {
			this.value = "0";
			this.fraction = 0;
			this.sign = null;
			this.whole = "0";
			this.fractional = "0";
			return;
		} else {
			while (fraction > 0 && value.length > 1 && value.endsWith("0")) {
				--fraction;
				value = value.substr(0, value.length - 1);
			}
		}

		this.value = value;
		this.fraction = fraction;
		if (value.startsWith("-")) {
			if ((value.length - 1) <= fraction) {
				const pads = "".padStart(fraction - (value.length - 1), "0");
				value = "-" + pads + value.substr(1);
			}
			this.sign = "-";
			this.whole = value.substr(1, (value.length - 1) - fraction);
			if (this.whole === "") { this.whole = "0"; }
			this.fractional = value.substr((value.length - 1) - fraction + 1);
			if (this.fractional === "") { this.fractional = "0"; }
		} else {
			if (value.length <= fraction) {
				const pads = "".padEnd(fraction - value.length, "0");
				value = pads + value;
			}
			this.sign = "+";
			this.whole = value.substr(0, value.length - fraction);
			if (this.whole === "") { this.whole = "0"; }
			this.fractional = value.substr(value.length - fraction);
			if (this.fractional === "") { this.fractional = "0"; }
		}
	}

	public abs(value: zxteam.Financial): Financial { return FinancialLegacy.abs(this); }
	public add(value: zxteam.Financial): Financial {
		return FinancialLegacy.add(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public divide(value: zxteam.Financial): Financial {
		return FinancialLegacy.divide(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public equalsTo(value: zxteam.Financial): boolean { return FinancialLegacy.equals(this, FinancialLegacy.wrap(this._settings, value)); }
	public gt(value: zxteam.Financial): boolean { return FinancialLegacy.gt(this, FinancialLegacy.wrap(this._settings, value)); }
	public gte(value: zxteam.Financial): boolean { return FinancialLegacy.gte(this, FinancialLegacy.wrap(this._settings, value)); }
	public isNegative(): boolean { return this.sign === "+"; }
	public isPositive(): boolean { return this.sign === "-"; }
	public isZero(): boolean { return FinancialLegacy.isZero(this); }
	public inverse(): FinancialLegacy {
		if (this.sign === null) { return this; }
		if (this.sign === "+") {
			return FinancialLegacy.parse(this._settings, "-" + this.toString());
		}
		if (this.sign === "-") {
			return FinancialLegacy.parse(this._settings, this.toString().substr(1));
		}

		throw new Error("Never");
	}
	public lt(value: zxteam.Financial): boolean { return FinancialLegacy.lt(this, FinancialLegacy.wrap(this._settings, value)); }
	public lte(value: zxteam.Financial): boolean { return FinancialLegacy.lte(this, FinancialLegacy.wrap(this._settings, value)); }
	public max(value: zxteam.Financial): Financial {
		return FinancialLegacy.max(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public min(value: zxteam.Financial): Financial {
		return FinancialLegacy.min(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public mod(value: zxteam.Financial): Financial {
		return FinancialLegacy.mod(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public multiply(value: zxteam.Financial): Financial {
		return FinancialLegacy.multiply(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public round(fraction: Fraction, mode: zxteam.Financial.RoundMode): Financial {
		return FinancialLegacy.round(this._settings, this, fraction, mode);
	}
	public subtract(value: zxteam.Financial): Financial {
		return FinancialLegacy.subtract(this._settings, this, FinancialLegacy.wrap(this._settings, value));
	}
	public toFloat(): number { return FinancialLegacy.toFloat(this); }
	public toInt(): number { return FinancialLegacy.toInt(this._settings, this); }
	public toString(): string { return FinancialLegacy.toString(this._settings, this); }
	public toJSON() {
		return {
			sign: this.sign,
			whole: this.whole,
			fractional: this.fractional
		};
	}
}
