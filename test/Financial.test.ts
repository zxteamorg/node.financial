import { assert } from "chai";

import { financial } from "../src/index";

describe("Stub", function () {
	it("Should be 2 + 2 = 4", function () {
		const first = financial(2);
		const second = financial(2);
		const result = first.plus(second);
		assert.equal(result.toString(), "4");
	});

	it("Should be '2' + '2' = '4'", function () {
		const first = financial("2");
		const second = financial("2");
		const result = first.plus(second);
		assert.equal(result.toString(), "4");
	});
});
