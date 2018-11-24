export class Financial {
	private readonly _value: string;
	private readonly _fraction: number;

	public static equals(left: Financial, right: Financial): boolean {
		return left.equalsTo(right);
	}

	public constructor(integerString: string, fraction: number) {
		// TODO Check integerString for correct digits
		// TODO Check fraction

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
		// TODO
		return this._value;
	}
}

export function financial(value: number, fractionDigits: number): Financial;
export function financial(value: number | string): Financial;
export function financial(...args: Array<any>): Financial {
	if (args.length === 1) {
		const value = args[0];
		const argsRegex = /^-?(0|0\.[0-9]+|[1-9][0-9]+\.[0-9]+)$/;
		if (typeof (value) === "number") {

			const toStringValue = String(value);
			const spliteValue = toStringValue.split(".");
			const stringValue = toStringValue.replace(".", "");
			const countValue = (spliteValue.length > 1) ? spliteValue[1].length : 0;

			return new Financial(stringValue, countValue);
		} else if (typeof (value) === "string") {
			if (!argsRegex.test(value)) { throw new Error("Invalid string"); }
			const stringValue = value.replace(".", "");
			const spliteValue = value.split(".");
			const countValue = (spliteValue.length > 1) ? spliteValue[1].length : 0;

			return new Financial(stringValue, countValue);
		} else {
			throw new Error("Unknown type");
		}
	}
	// TODO
	throw new Error("Not implemented yet");
}
export default financial;
