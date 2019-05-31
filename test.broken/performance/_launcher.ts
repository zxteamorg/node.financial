import * as zxteam from "@zxteam/contract";

import * as fs from "fs";
import * as path from "path";

import { Financial } from "../../src/index";
import { FinancialBase } from "../../src/impl/FinancialBase";
import { PerformanceResult } from "./_contract";

const currentDir = __dirname;
const files = fs.readdirSync(__dirname);
const performanceTestFiles = files.filter(f => !f.startsWith("_"));

performanceTestFiles.forEach(performanceTestFile => {
	const performanceTest: () => PerformanceResult = require(performanceTestFile);
	const performanceResult = performanceTest();
	console.log(JSON.stringify(performanceResult));
});
