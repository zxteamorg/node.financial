// This module provide a wrapper over https://www.npmjs.com/package/bignumber.js

import * as zxteam from "@zxteam/contract";
import { ArgumentError, InvalidOperationError } from "@zxteam/errors";

import { BigNumber } from "bignumber.js";

import { AbstractFinancial } from "./AbstractFinancial";
import { Settings } from "../Settings";

import { FractionDigitsGuard, UnreachableRoundMode } from "./heplers";

export default class BigNumberFinancial extends AbstractFinancial {
	private readonly _raw: BigNumber;


	public static fromFloat(value: number, settings: Settings): BigNumberFinancial {
		const raw = new BigNumber(value);
		return new BigNumberFinancial(raw, settings);
	}

	public static fromInt(value: number, settings: Settings): BigNumberFinancial {
		if (!Number.isSafeInteger(value)) {
			throw new ArgumentError(`Wrong value ${value}. Expected safe integer.`);
		}
		const raw = new BigNumber(value);
		return new BigNumberFinancial(raw, settings);
	}

	public static ensure(data: zxteam.Financial, errorMessage?: string): BigNumberFinancial {
		if (data instanceof BigNumberFinancial) { return data; }
		if (errorMessage === undefined) {
			errorMessage = "Wrong Financial object";
		}
		throw new ArgumentError(errorMessage);
	}

	public static ensureNullable(data: zxteam.Financial | null, errorMessage?: string): BigNumberFinancial | null {
		if (data === null) { return null; }
		return BigNumberFinancial.ensure(data, errorMessage);
	}

	public static parse(value: string, settings: Settings): BigNumberFinancial {
		AbstractFinancial.verify(value); // raise error if wrong value
		const raw = new BigNumber(value);
		const rawStr = raw.toString(10);
		if (rawStr !== value) {
			throw new ArgumentError(`The value ${value} cannot be represented in backend: 'bignumber'`);
		}
		if (settings.defaultRoundOpts.fractionalDigits < raw.decimalPlaces()) {
			const roundedRaw = raw.decimalPlaces(settings.defaultRoundOpts.fractionalDigits);
			return new BigNumberFinancial(roundedRaw, settings);
		} else {
			return new BigNumberFinancial(raw, settings);
		}
	}

	public abs(): BigNumberFinancial {
		const result: BigNumber = this._raw.abs();
		return new BigNumberFinancial(result, this._settings);
	}

	public add(value: zxteam.Financial): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.plus(friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public divide(value: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.div(friendlyValue._raw);

		const { fractionalDigits } = this._settings.defaultRoundOpts;

		if (fractionalDigits < result.decimalPlaces()) {
			if (roundMode === undefined) {
				roundMode = this._settings.defaultRoundOpts.roundMode;
			}
			const bigNumberRoundMode = convertRoundMode(roundMode, result.isPositive());
			const roundedResult = result.decimalPlaces(fractionalDigits, bigNumberRoundMode);
			return new BigNumberFinancial(roundedResult, this._settings);
		} else {
			return new BigNumberFinancial(result, this._settings);
		}
	}

	public equals(value: zxteam.Financial): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.isEqualTo(friendlyValue._raw);
	}

	public gt(value: zxteam.Financial): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.gt(friendlyValue._raw);
	}

	public gte(value: zxteam.Financial): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.gte(friendlyValue._raw);
	}

	public isNegative(): boolean {
		return this._raw.isNegative();
	}

	public isPositive(): boolean {
		return this._raw.isPositive() && !this.isZero();
	}

	public isZero(): boolean {
		return this._raw.isZero();
	}

	public inverse(): BigNumberFinancial {
		const result: BigNumber = this._raw.negated();
		return new BigNumberFinancial(result, this._settings);
	}

	public lt(value: zxteam.Financial): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.lt(friendlyValue._raw);
	}

	public lte(value: zxteam.Financial): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.lte(friendlyValue._raw);
	}

	public max(value: zxteam.Financial): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = BigNumber.max(this._raw, friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public min(value: zxteam.Financial): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = BigNumber.min(this._raw, friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public mod(value: zxteam.Financial): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.mod(friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public multiply(value: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.multipliedBy(friendlyValue._raw);

		const { fractionalDigits } = this._settings.defaultRoundOpts;

		if (fractionalDigits < result.decimalPlaces()) {
			if (roundMode === undefined) {
				roundMode = this._settings.defaultRoundOpts.roundMode;
			}
			const bigNumberRoundMode = convertRoundMode(roundMode, result.isPositive());
			const roundedResult = result.decimalPlaces(fractionalDigits, bigNumberRoundMode);
			return new BigNumberFinancial(roundedResult, this._settings);
		} else {
			return new BigNumberFinancial(result, this._settings);
		}
	}

	public round(fractionalDigits: zxteam.Financial.FractionDigits, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial {
		FractionDigitsGuard.verifyFraction(fractionalDigits);

		if (fractionalDigits < this._raw.decimalPlaces()) {
			if (roundMode === undefined) {
				roundMode = this._settings.defaultRoundOpts.roundMode;
			}
			const bigNumberRoundMode = convertRoundMode(roundMode, this.isPositive());
			const roundedResult = this._raw.decimalPlaces(fractionalDigits, bigNumberRoundMode);
			return new BigNumberFinancial(roundedResult, this._settings);
		} else {
			return this;
		}
	}

	public subtract(value: zxteam.Financial): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.minus(friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public toFloat(): number { return this._raw.toNumber(); }

	public toInt(): number {
		if (this._raw.decimalPlaces() > 0) {
			throw new InvalidOperationError("Wrong operation. Cannot cast financial value to integer due non-zero precision. Use round() instead.");
		}
		return this._raw.toNumber();
	}

	public toJSON(): string {
		return this.toString();
	}

	protected get data(): string {
		return this._raw.toString(10);
	}

	private constructor(value: BigNumber, settings: Settings) {
		if (settings.defaultRoundOpts.fractionalDigits < value.decimalPlaces()) {
			throw new ArgumentError(`Overflow fractionalDigits of Financial value`);
		}

		super(settings);
		this._raw = value;
	}

	private wrap(value: zxteam.Financial): BigNumberFinancial {
		if (value instanceof BigNumberFinancial) {
			return value;
		}
		return BigNumberFinancial.parse(value.toString(), this._settings);
	}
}

function convertRoundMode(roundMode: zxteam.Financial.RoundMode, isPositive: boolean): BigNumber.RoundingMode {
	switch (roundMode) {
		case zxteam.Financial.RoundMode.Ceil: return isPositive === true ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN;
		case zxteam.Financial.RoundMode.Floor: return isPositive === true ? BigNumber.ROUND_DOWN : BigNumber.ROUND_UP;
		case zxteam.Financial.RoundMode.Round: return isPositive === true ? BigNumber.ROUND_HALF_UP : BigNumber.ROUND_HALF_DOWN;
		case zxteam.Financial.RoundMode.Trunc: return BigNumber.ROUND_DOWN;
		default:
			throw new UnreachableRoundMode(roundMode);
	}
}
