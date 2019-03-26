import { Financial as FinancialLike } from "@zxteam/contract";

const valueRegExp = /^-?(0|[1-9][0-9]*)$/;

function getSeparatorChar(): string {
	// TODO: Detect locale and return correct separator.
	const exampleNum = 1000.01;
	const exampleStr = exampleNum.toLocaleString();
	const separator = exampleStr[exampleStr.length - 3];
	return separator;
}


export class Financial implements FinancialLike {
	private readonly _value: string;
	private readonly _fraction: number;

	public static create(value: number, fraction: number): Financial {
		return financial(value, fraction);
	}
	public static isFinancialLike(probablyFinancal: any): probablyFinancal is FinancialLike {
		if (typeof probablyFinancal === "object" && "value" in probablyFinancal && "fraction" in probablyFinancal) {
			const { value, fraction } = probablyFinancal;
			if (typeof value === "string" && typeof fraction === "number") {
				if (valueRegExp.test(value)) {
					if (Number.isSafeInteger(fraction) && fraction >= 0) {
						return true;
					}
				}
			}
		}
		return false;
	}
	public static equals(left: FinancialLike, right: FinancialLike): boolean {
		if (left.value === right.value && right.fraction === right.fraction) {
			return true;
		} else {
			return false;
		}
	}
	public static parse(num: string): Financial {
		return financial(num);
	}
	public static plus(left: FinancialLike, right: FinancialLike): Financial {
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

			return new Financial(result.toString(), fraction);
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

			return new Financial(result.toString(), fraction);
		}
	}
	public static minus(left: FinancialLike, right: FinancialLike): Financial {
		const summaryLength = left.value.length + right.value.length;
		const fraction = Math.max(left.fraction, right.fraction);
		if (summaryLength < 15) {
			// 15 symbols total length is safe to multiply in IEEE-754 range
			const friendlyLeftValue = Financial.toFloat(left);
			const friendlyRightValue = Financial.toFloat(right);
			const result = friendlyLeftValue - friendlyRightValue;
			return financial(result, fraction);
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
	public static multiply(left: FinancialLike, right: FinancialLike): Financial {
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
	public static divide(left: FinancialLike, right: FinancialLike): Financial {
		if (right.value === "0") {
			throw new Error("Division by zero");
		}
		if (left.value.length > 10 || right.value.length > 10) {
			throw new Error("Not implemented yet");
		}

		const first = Financial.toFloat(left);
		const second = Financial.toFloat(right);

		const result = first / second;

		const fraction = Math.max(left.fraction, right.fraction);
		return financial(result.toFixed(fraction));
	}
	public static toFloat(num: FinancialLike): number {
		const string = num.toString();
		return parseFloat(string);
	}
	public static toInt(num: FinancialLike): number {
		return parseInt(num.toString());
	}
	public static toString(num: FinancialLike): string {
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
	public static wrap(num: FinancialLike): Financial {
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

	public equalsTo(num: FinancialLike): boolean {
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

export function financial(wrap: FinancialLike): Financial;
export function financial(value: number, fractionDigits: number): Financial;
export function financial(value: string): Financial;
export function financial(...args: Array<any>): Financial {
	if (!Array.isArray(args)) {
		throw new Error("Wrong arguments: Expected an array");
	}

	const separatorChar = getSeparatorChar();

	if (args.length === 1) {
		const value = args[0];

		if (typeof (value) === "object" && typeof (value.value) === "string" && typeof (value.fraction) === "number") {
			// Implementation of financial(wrap: FinancialLike): Financial;
			const friendlyValue: FinancialLike = value;
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
			const stringValueF = (stringValue.length > 15)
				? zeroRegex.test(stringValue)
					? "0"
					: stringValue
				: parseInt(stringValue).toString();
			const fraction = (arrayValue.length > 1)
				? zeroRegex.test(stringValue)
					? 0
					: arrayValue[1].length
				: 0;

			return new Financial(stringValueF, fraction);
		}
	}
	if (args.length === 2) {
		const value = args[0];
		const fraction = args[1];
		if (typeof (value) === "number" && typeof (fraction) === "number") {

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
