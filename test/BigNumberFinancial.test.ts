import { Financial as FinancialLike } from "@zxteam/contract";

import { assert } from "chai";

import { default as BigNumberFinancial } from "../src/impl/BigNumberFinancial";
import { ArgumentError } from "@zxteam/errors";

describe(`BigNumberFinancial tests`, function () {

	it("Should miss precision (due overflow)", function () {
		const str = BigNumberFinancial.parse("123456789012345678901234.123456789012345678999234", {
			decimalSeparator: ".",
			defaultRoundOpts: {
				fractionalDigits: 20,
				roundMode: FinancialLike.RoundMode.Round
			}
		}).toString();
		assert.equal(str, "123456789012345678901234.123456789012345679");
	});

	it("Should NOT miss precision", function () {
		const str = BigNumberFinancial.parse("123456789012345678901234.123456789012345678901234", {
			decimalSeparator: ".",
			defaultRoundOpts: {
				fractionalDigits: 24,
				roundMode: FinancialLike.RoundMode.Round
			}
		}).toString();

		assert.equal(str, "123456789012345678901234.123456789012345678901234");
	});
});
