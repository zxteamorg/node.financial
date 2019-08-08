import * as zxteam from "@zxteam/contract";
import { ArgumentError } from "@zxteam/errors";

import * as _ from "lodash";

import { Settings } from "../Settings";

export abstract class AbstractFinancial implements zxteam.Financial {
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

	public abstract abs(): zxteam.Financial;
	public abstract add(value: zxteam.Financial): zxteam.Financial;
	public abstract divide(value: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;
	public abstract equals(value: zxteam.Financial): boolean;
	public abstract gt(value: zxteam.Financial): boolean;
	public abstract gte(value: zxteam.Financial): boolean;
	public abstract inverse(): zxteam.Financial;
	public abstract isNegative(): boolean;
	public abstract isPositive(): boolean;
	public abstract isZero(): boolean;
	public abstract lt(value: zxteam.Financial): boolean;
	public abstract lte(value: zxteam.Financial): boolean;
	public abstract max(value: zxteam.Financial): zxteam.Financial;
	public abstract min(value: zxteam.Financial): zxteam.Financial;
	public abstract mod(value: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;
	public abstract multiply(value: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;
	public abstract round(fractionalDigits: zxteam.Financial.FractionDigits, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;
	public abstract subtract(value: zxteam.Financial): zxteam.Financial;
	public abstract toFloat(): number;
	public abstract toInt(): number;
	public toString(): string { return this.raw; }

	protected abstract get raw(): string;
}


