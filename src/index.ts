
enum Action { MINUS, PLUS, MULTIPLY, DIVIDE }

export class Financial {
	private readonly _value: string;
	private readonly _fraction: number;
	private readonly _separatorChar: string;

	public static equals(left: Financial, right: Financial): boolean {
		return left.equalsTo(right);
	}

	public constructor(integerString: string, fraction: number) {
		const argsRegex = /^(-?[0-9]*)$/;
		// const argsRegex = /^(-?(?!(0))[1-9][0-9]*)$/;
		// const argsRegex = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;
		if (!argsRegex.test(integerString)) { throw new Error("Invalid integerString string"); }
		if (!Financial._isInt(fraction)) { throw new Error("Invalid fraction number"); }

		this._separatorChar = ".";
		this._value = integerString;
		this._fraction = fraction;
	}

	public get value(): string { return this._value; }
	public get fraction(): number { return this._fraction; }

	public equalsTo(value: Financial): boolean {
		if (this._value === value._value && this._fraction && value._fraction) {
			return true;
		} else {
			return false;
		}
	}

	public plus(value: Financial): Financial {
		if (this._value.length > 10 || value._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(this, value, Action.PLUS);
	}
	public minus(value: Financial): Financial {
		if (this._value.length > 10 || value._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(this, value, Action.MINUS);
	}
	public multiply(value: Financial): Financial {
		if (this._value.length > 10 || value._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(this, value, Action.MULTIPLY);
	}
	public divide(value: Financial): Financial {
		if (this._value.length > 10 || value._value.length > 10) {
			throw new Error("Not implemented yet");
		}
		return Financial._actionMath(this, value, Action.DIVIDE);
	}

	public toFloat(): number {
		const string = this.toString();
		const number = parseFloat(string);
		return number;
	}
	public toInt(): number {
		// TODO
		return parseInt(this.toString());
	}
	public toString(): string {
		if (this._fraction === 0) {
			return String(this._value);
		} else {
			const indexReal = this._value.length - this._fraction;
			return this._value.substr(0, indexReal) + this._separatorChar + this._value.substr(indexReal);
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

export function financial(value: number, fractionDigits: number): Financial;
export function financial(value: string): Financial;
export function financial(...args: Array<any>): Financial {
	const _separatorChar = ".";
	if (args.length === 1) {
		const value = args[0];

		if (typeof (value) === "string") {
			const argsRegex = /^[+-]?\d+(\.\d+)?$/;
			if (!argsRegex.test(value)) { throw new Error("Invalid string"); }
			const stringValue = value.replace(_separatorChar, "");
			const spliteValue = value.split(_separatorChar);
			const countValue = (spliteValue.length > 1) ? spliteValue[1].length : 0;

			return new Financial(stringValue, countValue);
		} else {
			throw new Error("Unknown arg");
		}
	}
	if (args.length === 2) {
		const value = args[0];
		const fraction = args[1];
		if (typeof (value) === "number" && typeof (fraction) === "number") {
			const fixNum = value.toFixed(fraction);
			const friendNum = fixNum.replace(_separatorChar, "");
			return new Financial(friendNum, fraction);
		} else {
			throw new Error("Unknown arg");
		}
	}
	throw new Error("Unknown arg");
}
export default financial;
