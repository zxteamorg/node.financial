import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Settings } from "../contract";
import { FinancialBase } from "./FinancialBase";

function abs(v: bigint): bigint { return v > 0 ? v : v * -1n; }

export abstract class BigIntFinancial extends FinancialBase {
	public readonly fraction: number;

	private static readonly _multipliers: { [multiplierIndex: number]: bigint } = {};
	private readonly _value: bigint;

	public static wrap(settings: Settings, num: string | zxteam.Financial): BigIntFinancial {
		if (_.isString(num)) {
			num = FinancialBase.parse(settings, num);
		} else if (!FinancialBase.isFinancial(num)) {
			throw new Error("Wrong arguments passed");
		}

		//return new BigIntFinancial();

		throw new Error();
	}


	// public constructor(sign: string, fraction: number) {
	// 	this.sign = sign;
	// 	this.whole = sign;
	// 	this.fractional = sign;
	// 	this.fraction = fraction;
	// }

	//public get value(): string { return this._value.toString(); }

	// public round(fraction: number): BigIntFinancial {
	// 	if (fraction >= this.fraction) {
	// 		// No need to round as fraction no changes or increase fraction
	// 		return new BigIntFinancial(this._value, this.fraction);
	// 	} else {
	// 		// Need to round
	// 		const shiftMultiplierIndex = this.fraction - fraction;

	// 		if (shiftMultiplierIndex === 1) {
	// 			let shiftValue = this._value / 10n;
	// 			const roundValue = abs(this._value % 10n);

	// 			if (shiftValue >= 0n) {
	// 				if (roundValue >= 5n) {
	// 					shiftValue += 1n;
	// 				}
	// 			} else {
	// 				if (roundValue >= 6n) {
	// 					shiftValue -= 1n;
	// 				}
	// 			}

	// 			return new BigIntFinancial(shiftValue, fraction);
	// 		} else {
	// 			// we need 2 more digits to perform round operation
	// 			const roundMultiplier: bigint = BigIntFinancial.getMultiplier(shiftMultiplierIndex - 2);

	// 			const roundBase = this._value / roundMultiplier;

	// 			let shiftValue = roundBase / 100n;
	// 			const roundValue = abs(roundBase % 100n);

	// 			if (shiftValue >= 0n) {
	// 				if (roundValue >= 50n) {
	// 					shiftValue += 1n;
	// 				}
	// 			} else {
	// 				if (roundValue >= 51n) {
	// 					shiftValue -= 1n;
	// 				}
	// 			}

	// 			return new BigIntFinancial(shiftValue, fraction);
	// 		}
	// 	}
	// }

	private static getMultiplier(multiplierIndex: number): bigint {
		let multiplier = BigIntFinancial._multipliers[multiplierIndex];
		if (multiplier !== undefined) { return multiplier; }

		if (!(Number.isSafeInteger(multiplierIndex) && multiplierIndex >= 0)) {
			throw new Error("Wrong argument multiplierIndex. It should be safe integer >= zero.");
		}

		multiplier = 10n ** BigInt(multiplierIndex);
		BigIntFinancial._multipliers[multiplierIndex] = multiplier;
		return multiplier;
	}
}
