import { FinancialLike } from "@zxteam/contract";


enum Action { MINUS, PLUS, MULTIPLY, DIVIDE }

export class Financial implements FinancialLike {
	private readonly _value: string;
	private readonly _fraction: number;

	public static equals(left: Financial, right: Financial): boolean {
		return left.equalsTo(right);
	}
	public static plus(left: Financial, right: Financial): Financial {
		if (left._value.length > 10 || left._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(left, right, Action.PLUS);
	}
	public static minus(left: Financial, right: Financial): Financial {
		if (left._value.length > 10 || left._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(left, right, Action.MINUS);
	}
	public static multiply(left: Financial, right: Financial): Financial {
		if (left._value.length > 10 || left._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(left, right, Action.MULTIPLY);
	}
	public static divide(left: Financial, right: Financial): Financial {
		if (left._value.length > 10 || left._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(left, right, Action.DIVIDE);
	}

	public constructor(integerString: string, fraction: number) {
		const argsRegex = /^-?(0|[1-9][0-9]*)$/;
		if (!argsRegex.test(integerString)) { throw new Error("Invalid integerString string"); }
		if (!Financial._isInt(fraction)) { throw new Error("Invalid fraction number"); }

		this._value = integerString;
		this._fraction = fraction;
	}

	public get value(): string { return this._value; }
	public get fraction(): number { return this._fraction; }

	public equalsTo(value: Financial): boolean {
		if (this._value === value._value && this._fraction === value._fraction) {
			return true;
		} else {
			return false;
		}
	}

	public toFloat(): number {
		const string = this.toString();
		return parseFloat(string);
	}
	public toInt(): number {
		return parseInt(this.toString());
	}
	public toString(): string {
		if (this._fraction === 0) {
			return String(this._value);
		} else {
			const number = parseInt(this._value) / Math.pow(10, this._fraction);
			return number.toFixed(this._fraction);
		}
	}

	private static _isInt(n: number) {
		return Number(n) === n && n % 1 === 0;
	}

	private static _actionMath(a: Financial, b: Financial, action: Action): Financial {
		const first = (a._fraction === 0) ? a.toInt() : a.toFloat();
		const second = (b._fraction === 0) ? b.toInt() : b.toFloat();

		let num;
		switch (action) {
			case Action.PLUS:
				num = first + second;
				break;
			case Action.MINUS:
				num = first - second;
				break;
			case Action.MULTIPLY:
				num = first * second;
				break;
			case Action.DIVIDE:
				num = first / second;
				break;
			default:
				throw new Error("Not implemented yet");
		}

		const fixedNum = (a._fraction >= b._fraction)
			? num.toFixed(a._fraction)
			: num.toFixed(b._fraction);
		return financial(fixedNum);
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
