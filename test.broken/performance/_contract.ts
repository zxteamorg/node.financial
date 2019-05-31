import { Financial } from "@zxteam/contract";

import * as bignumberjs from "bignumber.js";
import * as decimaljs from "decimal.js";
import * as mathjs from "mathjs";

export namespace PerformanceTestContext {
	export interface Impls {
		stringCall(args: any): any;
		nativeCall(args: any): any;
	}
}

export interface PerformanceTestContext {
	readonly given: {
		nativeTests: [{
			financial: any
			// bignumberjs: any,
			// decimaljs: any,
			// mathjs: any
		}],
		stringTests: Array<any>
	};
	readonly impls: {
		readonly financial: PerformanceTestContext.Impls;
		// readonly bignumberjs: PerformanceTestContext.Impls;
		// readonly decimaljs: PerformanceTestContext.Impls;
		// readonly mathjs: PerformanceTestContext.Impls;
	};
}

export interface PerformanceResult {
	//
}
