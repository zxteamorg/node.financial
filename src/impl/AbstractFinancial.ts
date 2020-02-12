import { Financial as FinancialLike } from "@zxteam/contract";
import { ArgumentError } from "@zxteam/errors";

import * as _ from "lodash";

import { Settings } from "../Settings";

export abstract class AbstractFinancial implements FinancialLike {
	public static readonly FinancialRegExp = /^([+-]?)(0|[1-9][0-9]*)(\.([0-9]+))?$/;
	protected readonly _settings: Settings;

	protected static verify(test: string): void {
		if (!AbstractFinancial.FinancialRegExp.test(test)) {
			throw new ArgumentError(`Bad Financial value: ${test}`);
		}
	}

	public constructor(settings: Settings) {
		this._settings = settings;
	}

	public abstract abs(): FinancialLike;
	public abstract add(value: FinancialLike): FinancialLike;
	public abstract divide(
		value: FinancialLike, fractionalDigits: FinancialLike.FractionDigits, roundMode: FinancialLike.RoundMode
	): FinancialLike;
	public abstract equals(value: FinancialLike): boolean;
	public abstract gt(value: FinancialLike): boolean;
	public abstract gte(value: FinancialLike): boolean;
	public abstract inverse(): FinancialLike;
	public abstract isNegative(): boolean;
	public abstract isPositive(): boolean;
	public abstract isZero(): boolean;
	public abstract lt(value: FinancialLike): boolean;
	public abstract lte(value: FinancialLike): boolean;
	public abstract max(value: FinancialLike): FinancialLike;
	public abstract min(value: FinancialLike): FinancialLike;
	public abstract mod(
		value: FinancialLike, fractionalDigits: FinancialLike.FractionDigits, roundMode: FinancialLike.RoundMode
	): FinancialLike;
	public abstract multiply(
		value: FinancialLike, fractionalDigits: FinancialLike.FractionDigits, roundMode: FinancialLike.RoundMode
	): FinancialLike;
	public abstract round(
		fractionalDigits: FinancialLike.FractionDigits, roundMode: FinancialLike.RoundMode
	): FinancialLike;
	public abstract subtract(value: FinancialLike): FinancialLike;
	public abstract toFloat(): number;
	public abstract toInt(): number;
	public toString(): string { return this.raw; }

	protected abstract get raw(): string;
}


