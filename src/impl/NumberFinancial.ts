// import { FinancialBase } from "./FinancialBase";

// export class NumberFinancial implements FinancialBase {
// 	public readonly fraction: number;
// 	private readonly _value: number;

// 	public constructor(value: number, fraction: number) {
// 		this._value = value;
// 		this.fraction = fraction;
// 	}

// 	public get value(): string { return this._value.toFixed(this.fraction); }

// 	public round(fraction: number): NumberFinancial {
// 		if (fraction >= this.fraction) {
// 			return new NumberFinancial(this._value, fraction);
// 		} else {
// 			const multiplier = Math.pow(10, fraction);
// 			const subValue = (Math.round(this._value * multiplier));
// 			return new NumberFinancial(subValue, fraction);
// 		}
// 	}
// }
