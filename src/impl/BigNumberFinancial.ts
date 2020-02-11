// This module provide a wrapper over https://www.npmjs.com/package/bignumber.js

import { Financial as FinancialLike } from "@zxteam/contract";
import { ArgumentError, InvalidOperationError } from "@zxteam/errors";

import { BigNumber } from "bignumber.js";

import { AbstractFinancial } from "./AbstractFinancial";
import { Settings } from "../Settings";

import { FractionDigitsGuard, UnreachableRoundMode } from "./heplers";

// See https://mikemcl.github.io/bignumber.js/#decimal-places
const DECIMAL_PLACES_MAP = new Map<BigNumber.Config["DECIMAL_PLACES"], typeof BigNumber>();
function getBigNumberImpl(DECIMAL_PLACES: BigNumber.Config["DECIMAL_PLACES"]): typeof BigNumber {
	const existentBN = DECIMAL_PLACES_MAP.get(DECIMAL_PLACES);
	if (existentBN !== undefined) { return existentBN; }
	const newBN = BigNumber.clone();
	newBN.config({ DECIMAL_PLACES });
	DECIMAL_PLACES_MAP.set(DECIMAL_PLACES, newBN);
	return newBN;
}

export default class BigNumberFinancial extends AbstractFinancial {
	private readonly _raw: BigNumber;

	public static fromFloat(value: number, settings: Settings): BigNumberFinancial {
		const BN = getBigNumberImpl(settings.defaultRoundOpts.fractionalDigits);
		const raw = new BN(value);

		if (settings.defaultRoundOpts.fractionalDigits < raw.decimalPlaces()) {
			let rawRoundMode: BigNumber.RoundingMode;
			switch (settings.defaultRoundOpts.roundMode) {
				case FinancialLike.RoundMode.Ceil:
					rawRoundMode = BigNumber.ROUND_CEIL;
					break;
				case FinancialLike.RoundMode.Floor:
					rawRoundMode = BigNumber.ROUND_FLOOR;
					break;
				case FinancialLike.RoundMode.Round:
					rawRoundMode = BigNumber.ROUND_HALF_EVEN;
					break;
				case FinancialLike.RoundMode.Trunc:
					rawRoundMode = BigNumber.ROUND_DOWN;
					break;
			}
			const correctedRaw: BigNumber = raw.decimalPlaces(settings.defaultRoundOpts.fractionalDigits, rawRoundMode);
			return new BigNumberFinancial(correctedRaw, settings);
		}

		return new BigNumberFinancial(raw, settings);
	}

	public static fromInt(value: number, settings: Settings): BigNumberFinancial {
		if (!Number.isSafeInteger(value)) {
			throw new ArgumentError(`Wrong value ${value}. Expected safe integer.`);
		}
		const BN = getBigNumberImpl(settings.defaultRoundOpts.fractionalDigits);
		const raw = new BN(value);

		return new BigNumberFinancial(raw, settings);
	}

	public static ensure(data: FinancialLike, errorMessage?: string): BigNumberFinancial {
		if (data instanceof BigNumberFinancial) { return data; }
		if (errorMessage === undefined) {
			errorMessage = "Wrong Financial object";
		}
		throw new ArgumentError(errorMessage);
	}

	public static ensureNullable(data: FinancialLike | null, errorMessage?: string): BigNumberFinancial | null {
		if (data === null) { return null; }
		return BigNumberFinancial.ensure(data, errorMessage);
	}

	public static parse(value: string, settings: Settings): BigNumberFinancial {
		AbstractFinancial.verify(value); // raise error if wrong value
		const BN = getBigNumberImpl(settings.defaultRoundOpts.fractionalDigits);
		const raw = new BN(value);

		const decimalPlaces = raw.decimalPlaces();
		if (decimalPlaces > settings.defaultRoundOpts.fractionalDigits) {
			const bigNumberRoundMode = convertRoundMode(settings.defaultRoundOpts.roundMode, raw.isPositive());
			const roundedRaw = raw.decimalPlaces(settings.defaultRoundOpts.fractionalDigits, bigNumberRoundMode);
			return new BigNumberFinancial(roundedRaw, settings);
		}

		let rawStr = raw.toString(10);
		if (rawStr.length < value.length) {
			if (decimalPlaces > 0) {
				// Workaround for X.XXX00000
				rawStr = rawStr.padEnd(value.length, "0");
			} else if (decimalPlaces === 0 && (rawStr.length + 1) < value.length) {
				// Workaround for X.00000
				rawStr += ".";
				rawStr = rawStr.padEnd(value.length, "0");
			}
		}
		if (rawStr !== value) {
			throw new ArgumentError(`The value ${value} cannot be represented in backend: 'bignumber'`);
		}
		if (settings.defaultRoundOpts.fractionalDigits < decimalPlaces) {
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

	public add(value: FinancialLike): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.plus(friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public divide(value: FinancialLike, roundMode?: FinancialLike.RoundMode): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);

		if (roundMode === undefined) {
			roundMode = this._settings.defaultRoundOpts.roundMode;
		}

		const { fractionalDigits } = this._settings.defaultRoundOpts;
		const BN = getBigNumberImpl(fractionalDigits + 2);
		const result: BigNumber = new BN(this._raw).div(friendlyValue._raw);
		const bigNumberRoundMode = convertRoundMode(roundMode, result.isPositive());
		const roundedResult = result.decimalPlaces(this._settings.defaultRoundOpts.fractionalDigits, bigNumberRoundMode);

		return new BigNumberFinancial(roundedResult, this._settings);
	}

	public equals(value: FinancialLike): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.isEqualTo(friendlyValue._raw);
	}

	public gt(value: FinancialLike): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.gt(friendlyValue._raw);
	}

	public gte(value: FinancialLike): boolean {
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

	public lt(value: FinancialLike): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.lt(friendlyValue._raw);
	}

	public lte(value: FinancialLike): boolean {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		return this._raw.lte(friendlyValue._raw);
	}

	public max(value: FinancialLike): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = BigNumber.max(this._raw, friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public min(value: FinancialLike): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = BigNumber.min(this._raw, friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public mod(value: FinancialLike): BigNumberFinancial {
		const friendlyValue: BigNumberFinancial = this.wrap(value);
		const result: BigNumber = this._raw.mod(friendlyValue._raw);
		return new BigNumberFinancial(result, this._settings);
	}

	public multiply(value: FinancialLike, roundMode?: FinancialLike.RoundMode): BigNumberFinancial {
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

	public round(fractionalDigits: FinancialLike.FractionDigits, roundMode?: FinancialLike.RoundMode): FinancialLike {
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

	public subtract(value: FinancialLike): BigNumberFinancial {
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

	protected get raw(): string {
		return this._raw.toString(10);
	}

	private constructor(value: BigNumber, settings: Settings) {
		if (settings.defaultRoundOpts.fractionalDigits < value.decimalPlaces()) {
			throw new ArgumentError(`Overflow fractionalDigits of Financial value`);
		}

		super(settings);
		this._raw = value;
	}

	private wrap(value: FinancialLike): BigNumberFinancial {
		if (value instanceof BigNumberFinancial) {
			return value;
		}
		return BigNumberFinancial.parse(value.toString(), this._settings);
	}
}

function convertRoundMode(roundMode: FinancialLike.RoundMode, isPositive: boolean): BigNumber.RoundingMode {
	switch (roundMode) {
		case FinancialLike.RoundMode.Ceil: return isPositive === true ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN;
		case FinancialLike.RoundMode.Floor: return isPositive === true ? BigNumber.ROUND_DOWN : BigNumber.ROUND_UP;
		case FinancialLike.RoundMode.Round: return isPositive === true ? BigNumber.ROUND_HALF_UP : BigNumber.ROUND_HALF_DOWN;
		case FinancialLike.RoundMode.Trunc: return BigNumber.ROUND_DOWN;
		default:
			throw new UnreachableRoundMode(roundMode);
	}
}
