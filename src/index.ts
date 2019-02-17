import { FinancialLike } from "@zxteam/contract";

const valueRegExp = /^-?(0|[1-9][0-9]*)$/;

export class Financial implements FinancialLike {
	private readonly _value: string;
	private readonly _fraction: number;

	public static isFinancialLike(testNum: any): testNum is FinancialLike {
		if (testNum && "value" in testNum && "fraction" in testNum) {
			if (typeof testNum.value === "string" && typeof testNum.fraction === "number") {
				return true;
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
	public static plus(left: FinancialLike, right: FinancialLike): Financial {
		if (left.value.length > 10 || left.value.length > 10) {
			throw new Error("Not implemented yet");
		}

		const first = Financial.toFloat(left);
		const second = Financial.toFloat(right);

		const result = first + second;

		const fraction = Math.max(left.fraction, right.fraction);
		return financial(result.toFixed(fraction));
	}
	public static minus(left: FinancialLike, right: FinancialLike): Financial {
		if (left.value.length > 10 || left.value.length > 10) {
			throw new Error("Not implemented yet");
		}

		const first = Financial.toFloat(left);
		const second = Financial.toFloat(right);

		const result = first - second;

		const fraction = Math.max(left.fraction, right.fraction);
		return financial(result.toFixed(fraction));
	}
	public static multiply(left: FinancialLike, right: FinancialLike): Financial {
		if (left.value.length > 10 || left.value.length > 10) {
			throw new Error("Not implemented yet");
		}

		const first = Financial.toFloat(left);
		const second = Financial.toFloat(right);

		const result = first * second;

		const fraction = Math.max(left.fraction, right.fraction);
		return financial(result.toFixed(fraction));
	}
	public static divide(left: FinancialLike, right: FinancialLike): Financial {
		if (left.value.length > 10 || left.value.length > 10) {
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
		if (num.fraction === 0) {
			return num.value;
		} else {
			const number = parseInt(num.value) / Math.pow(10, num.fraction);
			return number.toFixed(num.fraction);
		}
	}

	public constructor(value: string, fraction: number) {
		if (!valueRegExp.test(value)) {
			throw new Error(`Invalid argument 'value' = ${value}. Expected integer number in string representation`);
		}
		if (!Number.isInteger(fraction) || fraction < 0) {
			throw new Error(`Invalid argument 'fraction' = ${fraction}. Expected integer number >= 0.`);
		}

		while (fraction > 0 && value.length > 0 && value.endsWith("0")) {
			--fraction;
			value = value.substr(0, value.length - 1);
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

	const _separatorChar = ".";
	if (args.length === 1) {
		const value = args[0];

		if (typeof (value) === "object" && typeof (value.value) === "string" && typeof (value.fraction) === "number") {
			// Implementation of financial(wrap: FinancialLike): Financial;
			const friendlyValue: FinancialLike = value;
			return new Financial(friendlyValue.value, friendlyValue.fraction);
		} else if (typeof (value) === "string") {
			const argsRegex = /^[+-]?\d+(\.\d+)?$/;
			if (!argsRegex.test(value)) { throw new Error("Invalid string"); }

			// Negative/positive number
			const numb = (value.startsWith("-"))
				? - Math.abs(parseFloat(value))
				: Math.abs(parseFloat(value));

			let stringValue;
			let spliteValue;

			if (numb.toString().lastIndexOf("e") > -1) {
				stringValue = value.replace(_separatorChar, "");
				spliteValue = value.split(_separatorChar);
			} else {
				stringValue = numb.toString().replace(_separatorChar, "");
				spliteValue = numb.toString().split(_separatorChar);
			}

			const stringValueF = parseInt(stringValue).toString();
			const countValue = (spliteValue.length > 1) ? spliteValue[1].length : 0;

			return new Financial(stringValueF, countValue);
		}
	}
	if (args.length === 2) {
		const value = args[0];
		const fraction = args[1];
		if (typeof (value) === "number" && typeof (fraction) === "number") {
			const numb = (value > 0) ? Math.abs(value) : -Math.abs(value);

			const splitValue = (numb.toString().lastIndexOf("e") > -1)
				? value.toFixed(fraction).split(_separatorChar)
				: numb.toString().split(_separatorChar);

			const actualFraction = (splitValue.length > 1) ? splitValue[1].length : 0;
			const correctFraction = (actualFraction <= fraction) ? actualFraction : fraction;
			const diffFraction = actualFraction - fraction;

			const fixedNum = (diffFraction > 0)
				? numb.toString().slice(0, -(actualFraction - fraction))
				: value.toFixed(correctFraction);

			const friendlyNum = fixedNum.replace(_separatorChar, "");
			const superFriendlyNum = parseInt(friendlyNum).toString();

			return new Financial(superFriendlyNum, correctFraction);
		}
	}
	throw new Error("Unknown argument(s): " + args.join(", "));
}
export default financial;
