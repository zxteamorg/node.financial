import * as zxteam from "@zxteam/contract";

import * as _ from "lodash";

import { Fraction } from "./Fraction";


export function concatValue(wholePart: string, decimalPart: string): string {
	if (wholePart === "0") {
		return decimalPart;
	}

	if (wholePart === "-0") {
		return `-${decimalPart}`;
	}

	return `${wholePart}${decimalPart}`;
}
export function isPositive(num: zxteam.Financial): boolean {
	return num.sign === "+";
}
export function isNegative(num: zxteam.Financial): boolean {
	return num.sign === "-";
}
export function isFinancial(testValue: any): testValue is zxteam.Financial {
	if (_.isObjectLike(testValue) && _.isString(testValue.value) && Fraction.isFraction(testValue.fraction)) {
		if (valueRegExp.test(testValue.value)) {
			return true;
		}
	}
	return false;
}
// export function splitParts(num: zxteam.Financial): { wholePart: string, decimalPart: string } {
// 	const { value, fraction } = num;

// 	if (value === "0" || fraction === 0) {
// 		return { wholePart: value, decimalPart: "0" };
// 	}

// 	if (isPositive(num)) {
// 		return splitPartsPositive(value, fraction);
// 	} else {
// 		return splitPartsNegative(value, fraction);
// 	}
// }
function splitPartsPositive(value: string, fraction: Fraction): { wholePart: string, decimalPart: string } {
	if (value.length === fraction) {
		return { wholePart: "0", decimalPart: value };
	}

	const diffLen = value.length - fraction;
	if (diffLen > 0) {
		return { wholePart: value.substr(0, diffLen), decimalPart: value.substr(diffLen) };
	} else {
		return { wholePart: "0", decimalPart: value.padStart(fraction, "0") };
	}
}
function splitPartsNegative(value: string, fraction: Fraction): { wholePart: string, decimalPart: string } {
	if (value.length === fraction + 1) {
		return { wholePart: "-0", decimalPart: value.substr(1) };
	}

	const diffLen = value.length - (fraction + 1);
	if (diffLen > 0) {
		return { wholePart: "-" + value.substr(1, diffLen), decimalPart: value.substr(diffLen + 1) };
	} else {
		return { wholePart: "-0", decimalPart: value.substr(1).padStart(fraction, "0") };
	}
}

export class UnreachableRoundMode extends Error {
	public constructor(mode: never) {
		super(`Unsupported round mode: ${mode}`);
	}
}

export const valueRegExp = /^-?(0|[1-9][0-9]*)$/;
