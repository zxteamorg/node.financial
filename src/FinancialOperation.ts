import { Financial } from "@zxteam/contract";
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
	abs(value: Financial): Financial;

	add(left: string, right: string): string;
	add(left: Financial, right: Financial): Financial;

	divide(left: string, right: string, roundMode?: Financial.RoundMode): string;
	divide(left: Financial, right: Financial, roundMode?: Financial.RoundMode): Financial;

	equals(left: string, right: string): boolean;
	equals(left: Financial, right: Financial): boolean;

	ensure(value: Financial, errorMessage?: string): Financial;
	ensureNullable(value: Financial | null, errorMessage?: string): Financial | null;

	fromFloat(value: number): Financial;

	fromInt(value: number): Financial;

	gt(left: string, right: string): boolean;
	gt(left: Financial, right: Financial): boolean;

	gte(left: string, right: string): boolean;
	gte(left: Financial, right: Financial): boolean;

	inverse(value: string): string;
	inverse(value: Financial): Financial;

	isFinancial(test: any): test is Financial;

	isNegative(test: string): boolean;
	isNegative(test: Financial): boolean;

	isPositive(test: string): boolean;
	isPositive(test: Financial): boolean;

	isZero(test: string): boolean;
	isZero(test: Financial): boolean;

	lt(left: string, right: string): boolean;
	lt(left: Financial, right: Financial): boolean;

	lte(left: string, right: string): boolean;
	lte(left: Financial, right: Financial): boolean;

	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: string, right: string): string;
	/**
	 * Analog of Math.max()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	 */
	max(left: Financial, right: Financial): Financial;

	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: string, right: string): string;
	/**
	 * Analog of Math.min()
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min
	 */
	min(left: Financial, right: Financial): Financial;

	mod(left: string, right: string): string;
	mod(left: Financial, right: Financial): Financial;

	multiply(left: string, right: string, roundMode?: Financial.RoundMode): string;
	multiply(left: Financial, right: Financial, roundMode?: Financial.RoundMode): Financial;

	parse(value: string): Financial;

	round(value: string, fractionDigits: Financial.FractionDigits, roundMode?: Financial.RoundMode): string;
	round(value: Financial, fractionDigits: Financial.FractionDigits, roundMode?: Financial.RoundMode): Financial;

	subtract(left: string, right: string): string;
	subtract(left: Financial, right: Financial): Financial;

	toFloat(value: Financial): number;
	toInt(value: Financial): number;
}
