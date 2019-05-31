export type Fraction = number;
export namespace Fraction {
	export function isFraction(test: number): test is Fraction {
		if (Number.isSafeInteger(test) && test >= 0) {
			return true;
		} else {
			return false;
		}
	}
	export function verifyFraction(test: Fraction): test is Fraction {
		if (!isFraction(test)) {
			throw new Error("Wrong argument fraction. Expected integer >= 0");
		}
		return true;
	}
}
