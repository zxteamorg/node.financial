import * as zxteam from "@zxteam/contract";
import { Fraction } from "./Fraction";


export interface Financial extends zxteam.Financial {
	abs(value: zxteam.Financial): Financial;
	add(value: zxteam.Financial): Financial;
	divide(value: zxteam.Financial): Financial;
	equalsTo(value: zxteam.Financial): boolean;
	gt(value: zxteam.Financial): boolean;
	gte(value: zxteam.Financial): boolean;
	isNegative(): boolean;
	isPositive(): boolean;
	isZero(): boolean;
	lt(value: zxteam.Financial): boolean;
	lte(value: zxteam.Financial): boolean;
	max(value: zxteam.Financial): Financial;
	min(value: zxteam.Financial): Financial;
	mod(value: zxteam.Financial): Financial;
	multiply(value: zxteam.Financial): Financial;
	round(fraction: Fraction, mode: zxteam.Financial.RoundMode): Financial;
	subtract(value: zxteam.Financial): Financial;
	toFloat(): number;
	toInt(): number;
}

export interface FinancialOperation {
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(num: string): string;
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(num: zxteam.Financial): Financial;

	add(left: string, right: string): string;
	add(left: zxteam.Financial, right: zxteam.Financial): Financial;

	divide(left: string, right: string): string;
	divide(left: zxteam.Financial, right: zxteam.Financial): Financial;

	equals(left: string, right: string): boolean;
	equals(left: zxteam.Financial, right: zxteam.Financial): boolean;

	fromBigInt(value: BigInt): Financial;

	fromFloat(value: number, fraction: Fraction): Financial;

	fromInt(value: number): zxteam.Financial;

	gt(left: string, right: string): boolean;
	gt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	gte(left: string, right: string): boolean;
	gte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	isFinancial(test: any): test is zxteam.Financial;
	isNegative(test: zxteam.Financial): boolean;
	isPositive(test: zxteam.Financial): boolean;

	isZero(num: string): boolean;
	isZero(num: zxteam.Financial): boolean;

	lt(left: string, right: string): boolean;
	lt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	lte(left: string, right: string): boolean;
	lte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: string, right: string): string;
	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: zxteam.Financial, right: zxteam.Financial): Financial;

	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: string, right: string): string;
	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: zxteam.Financial, right: zxteam.Financial): Financial;

	mod(left: string, right: string): string;
	mod(left: zxteam.Financial, right: zxteam.Financial): Financial;

	multiply(left: string, right: string): string;
	multiply(left: zxteam.Financial, right: zxteam.Financial): Financial;

	parse(value: string): Financial;

	round(num: string, fraction: Fraction, mode: zxteam.Financial.RoundMode): string;
	round(num: zxteam.Financial, fraction: Fraction, mode: zxteam.Financial.RoundMode): Financial;

	subtract(left: string, right: string): string;
	subtract(left: zxteam.Financial, right: zxteam.Financial): Financial;

	toFloat(num: zxteam.Financial): number;
	toInt(num: zxteam.Financial): number;
	toString(num: zxteam.Financial): string;

	wrap(num: string): Financial;
	wrap(num: zxteam.Financial): Financial;
}

export interface Settings {
	readonly backend: "string" | "bigint";
	readonly decimalSeparator: string;
	readonly arithmeticMaxFractionalDigits: number;
	readonly arithmeticRoundMode: zxteam.Financial.RoundMode;
}
