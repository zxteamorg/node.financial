import { Financial as FinancialLike } from "@zxteam/contract";
import { Settings } from "./Settings";

export interface FinancialOperation {
	readonly settings: Settings;

	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(value: string): string;
	/**
	 * Analog of Math​.abs()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
	 */
	abs(value: FinancialLike): FinancialLike;

	add(left: string, right: string): string;
	add(left: FinancialLike, right: FinancialLike): FinancialLike;

	divide(left: string, right: string, roundMode?: FinancialLike.RoundMode): string;
	divide(left: FinancialLike, right: FinancialLike, roundMode?: FinancialLike.RoundMode): FinancialLike;

	equals(left: string, right: string): boolean;
	equals(left: FinancialLike, right: FinancialLike): boolean;

	ensure(value: FinancialLike, errorMessage?: string): FinancialLike;
	ensureNullable(value: FinancialLike | null, errorMessage?: string): FinancialLike | null;

	fromFloat(value: number, roundMode?: FinancialLike.RoundMode): FinancialLike;

	fromInt(value: number): FinancialLike;

	gt(left: string, right: string): boolean;
	gt(left: FinancialLike, right: FinancialLike): boolean;

	gte(left: string, right: string): boolean;
	gte(left: FinancialLike, right: FinancialLike): boolean;

	inverse(value: string): string;
	inverse(value: FinancialLike): FinancialLike;

	isFinancial(test: any): test is FinancialLike;

	isNegative(test: string): boolean;
	isNegative(test: FinancialLike): boolean;

	isPositive(test: string): boolean;
	isPositive(test: FinancialLike): boolean;

	isZero(test: string): boolean;
	isZero(test: FinancialLike): boolean;

	lt(left: string, right: string): boolean;
	lt(left: FinancialLike, right: FinancialLike): boolean;

	lte(left: string, right: string): boolean;
	lte(left: FinancialLike, right: FinancialLike): boolean;

	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: string, right: string): string;
	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: FinancialLike, right: FinancialLike): FinancialLike;

	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: string, right: string): string;
	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: FinancialLike, right: FinancialLike): FinancialLike;

	mod(left: string, right: string): string;
	mod(left: FinancialLike, right: FinancialLike): FinancialLike;

	multiply(left: string, right: string, roundMode?: FinancialLike.RoundMode): string;
	multiply(left: FinancialLike, right: FinancialLike, roundMode?: FinancialLike.RoundMode): FinancialLike;

	parse(value: string): FinancialLike;

	round(value: string, fractionDigits: FinancialLike.FractionDigits, roundMode?: FinancialLike.RoundMode): string;
	round(value: FinancialLike, fractionDigits: FinancialLike.FractionDigits, roundMode?: FinancialLike.RoundMode): FinancialLike;

	subtract(left: string, right: string): string;
	subtract(left: FinancialLike, right: FinancialLike): FinancialLike;

	toFloat(value: FinancialLike): number;
	toInt(value: FinancialLike): number;
}
