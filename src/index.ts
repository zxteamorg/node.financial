import { FinancialLike } from "@zxteam/contract";

export class Financial implements FinancialLike {
	private readonly _value: string;
	private readonly _fraction: number;

	public static parse(value: number | string): Financial {
		if (typeof (value) === "number") {
			// TODO decimal values
			return new Financial(value.toString(), 0);
		}
		// TODO
		throw new Error("Not implemented yet");
	}

	public constructor(integerString: string, fraction: number) {
		// TODO Check integerString for correct digits
		// TODO Check fraction

		this._value = integerString;
		this._fraction = fraction;
	}

	public get value(): string { return this._value; }
	public get fraction(): number { return this._fraction; }

	public plus(value: FinancialLike): Financial {
		throw new Error("Not implemented yet");
	}
	public minus(value: FinancialLike): Financial {
		throw new Error("Not implemented yet");
	}
	public multiply(value: FinancialLike): Financial {
		throw new Error("Not implemented yet");
	}
	public divide(value: FinancialLike): Financial {
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

export const financial = Financial.parse;
export default financial;
