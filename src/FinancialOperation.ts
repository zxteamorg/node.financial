import * as zxteam from "@zxteam/contract";

export interface FinancialOperation {
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(value: string): string;
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(value: zxteam.Financial): zxteam.Financial;

	add(left: string, right: string): string;
	add(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	divide(left: string, right: string, roundMode?: zxteam.Financial.RoundMode): string;
	divide(left: zxteam.Financial, right: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;

	equals(left: string, right: string): boolean;
	equals(left: zxteam.Financial, right: zxteam.Financial): boolean;

	ensure(value: zxteam.Financial, errorMessage?: string): zxteam.Financial;
	ensureNullable(value: zxteam.Financial | null, errorMessage?: string): zxteam.Financial | null;

	fromFloat(value: number): zxteam.Financial;

	fromInt(value: number): zxteam.Financial;

	gt(left: string, right: string): boolean;
	gt(left: zxteam.Financial, right: zxteam.Financial): boolean;

	gte(left: string, right: string): boolean;
	gte(left: zxteam.Financial, right: zxteam.Financial): boolean;

	inverse(value: string): string;
	inverse(value: zxteam.Financial): zxteam.Financial;

	isFinancial(test: any): test is zxteam.Financial;

	isNegative(test: string): boolean;
	isNegative(test: zxteam.Financial): boolean;

	isPositive(test: string): boolean;
	isPositive(test: zxteam.Financial): boolean;

	isZero(test: string): boolean;
	isZero(test: zxteam.Financial): boolean;

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
	max(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: string, right: string): string;
	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	mod(left: string, right: string): string;
	mod(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	multiply(left: string, right: string, roundMode?: zxteam.Financial.RoundMode): string;
	multiply(left: zxteam.Financial, right: zxteam.Financial, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;

	parse(value: string): zxteam.Financial;

	round(value: string, fractionDigits: zxteam.Financial.FractionDigits, roundMode?: zxteam.Financial.RoundMode): string;
	round(value: zxteam.Financial, fractionDigits: zxteam.Financial.FractionDigits, roundMode?: zxteam.Financial.RoundMode): zxteam.Financial;

	subtract(left: string, right: string): string;
	subtract(left: zxteam.Financial, right: zxteam.Financial): zxteam.Financial;

	toFloat(value: zxteam.Financial): number;
	toInt(value: zxteam.Financial): number;
}



