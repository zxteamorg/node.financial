import { Financial as FinancialLike } from "@zxteam/contract";
import { ArgumentError } from "@zxteam/errors";

export namespace FractionDigitsGuard {
	export function isFraction(test: number): test is FinancialLike.FractionDigits {
		return Number.isSafeInteger(test) && test >= 0;
	}
	export function verifyFraction(test: FinancialLike.FractionDigits): test is FinancialLike.FractionDigits {
		if (!isFraction(test)) {
			throw new ArgumentError("Wrong argument fraction. Expected integer >= 0");
		}
		return true;
	}
}

export class UnreachableRoundMode extends Error {
	public constructor(roundMode: never) {
		super(`Unsupported round mode: ${roundMode}`);
	}
}
