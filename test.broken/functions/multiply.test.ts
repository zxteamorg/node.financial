import { assert } from "chai";
import Financial from "../../src/index";
import * as zxteam from "@zxteam/contract";

interface TestCases {
	multiply: Array<[zxteam.Financial, zxteam.Financial, [string, number]]>;
}

const positiveTestCases: TestCases = {
	multiply: [
		[{ value: "3459827342983472344985434522", fraction: 2 }, { value: "23434", fraction: 2 }, ["81077593955474690932388672588548", 4]],
		[{ value: "-354793854798395473548395", fraction: 8 }, { value: "45623", fraction: 2 }, ["-16186760037467196689698425085", 10]],
		[{ value: "123456789012345123456789012345", fraction: 15 }, { value: "-2", fraction: 0 }, ["-246913578024690246913578024690", 15]],
		[{ value: "-354793854798395473548395", fraction: 8 }, { value: "0", fraction: 0 }, ["0", 0]],
		[{ value: "42", fraction: 0 }, { value: "-1", fraction: 0 }, ["-42", 0]],
		[{ value: "42", fraction: 0 }, { value: "-2", fraction: 0 }, ["-84", 0]],
		[{ value: "-42", fraction: 0 }, { value: "-2", fraction: 0 }, ["84", 0]],
		[{ value: "4212345678", fraction: 8 }, { value: "-1", fraction: 0 }, ["-4212345678", 8]]
	]
};

describe("multiply", function () {
	positiveTestCases.multiply.forEach(multiplyCase => {
		const [left, right, expectedResult] = multiplyCase;
		const [expectedValue, expectedFraction] = expectedResult;
		it(
			// tslint:disable-next-line: max-line-length
			`Should multiply values "${JSON.stringify(left)}" and "${JSON.stringify(right)}" to v:"${expectedValue}" and fraction:${expectedFraction}`,
			function () {
				const result = Financial.multiply(left, right);
				assert.equal(result.value, expectedValue);
				assert.equal(result.fraction, expectedFraction);
			});
	});
});
