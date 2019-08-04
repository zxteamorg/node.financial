import * as zxteam from "@zxteam/contract";
import { ArgumentError } from "@zxteam/errors";

export namespace FractionDigitsGuard {
	export function isFraction(test: number): test is zxteam.Financial.FractionDigits {
		return Number.isSafeInteger(test) && test >= 0;
	}
	export function verifyFraction(test: zxteam.Financial.FractionDigits): test is zxteam.Financial.FractionDigits {
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
