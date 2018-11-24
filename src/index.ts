import { FinancialLike } from "@zxteam/contract";

export class Financial implements FinancialLike {
	private readonly _value: string;
	private readonly _fraction: number;

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
		return parseFloat(this.toString());
	}
	public toInt(): number {
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
		if (typeof (value) === "number") {
			// TODO decimal values
			return new Financial(value.toString(), 0);
		}
	}
	// TODO
	throw new Error("Not implemented yet");
}
export default financial;
