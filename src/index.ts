export class Financial {
	private readonly _value: string;
	private readonly _fraction: number;
	private readonly _separatorChar: string;

	public static equals(left: Financial, right: Financial): boolean {
		return left.equalsTo(right);
	}

	public constructor(integerString: string, fraction: number) {
		const argsRegex = /^(-?(?!(0))[1-9][0-9]*)$/;
		if (!argsRegex.test(integerString)) { throw new Error("Invalid integerString string"); }
		if (!this.isInt(fraction)) { throw new Error("Invalid fraction number"); }

		this._separatorChar = ".";
		this._value = integerString;
		this._fraction = fraction;
	}

	public get value(): string { return this._value; }
	public get fraction(): number { return this._fraction; }

	public equalsTo(value: Financial): boolean {
		throw new Error("Not implemented yet");
	}

	public plus(value: Financial): Financial {
		throw new Error("Not implemented yet");
	}
	public minus(value: Financial): Financial {
		throw new Error("Not implemented yet");
	}
	public multiply(value: Financial): Financial {
		throw new Error("Not implemented yet");
	}
	public divide(value: Financial): Financial {
		throw new Error("Not implemented yet");
	}

	public toFloat(): number {
		// TODO
		return parseFloat(this.toString());
	}
	public toInt(): number {
		// TODO
		return parseInt(this.toString());
	}
	public toString(): string {
		const number = this._value.split("");
		const fullNumber = number.splice(-this._fraction, 0, this._separatorChar);
		return fullNumber.toString();
	}
	private isInt(n: number) {
		return Number(n) === n && n % 1 === 0;
	}
}

export function financial(value: number, fractionDigits: number): Financial;
export function financial(value: string): Financial;
export function financial(...args: Array<any>): Financial {
	const _separatorChar = ".";
	if (args.length === 1) {
		const value = args[0];

		if (typeof (value) === "string") {
			const argsRegex = /^-?(0|0\.[0-9]+|[1-9][0-9]+\.[0-9]+)$/;
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
