# Getting Started
This getting started describes how to install, load, and use @zxteam/financial.js.

## Install
Financial.js can be installed using various package managers like npm.

To install via npm, run:
```BASH
npm install @zxteam/financial.js
```

## Load
Financial.js can be used in node.js.
```JAVASCRIPT
// load financial.js
import { financial, Financial } from "@zxteam/financial.js";

// use financial.js
const left = financial("10");
const right = financial("2");

const plus = Financial.plus(left, right);
console.log(plus.toString()); // "12"

const minus = Financial.minus(left, right);
console.log(minus.toString()); // "8"

const multiply = Financial.multiply(left, right);
console.log(multiply.toString()); // "20"

const divide = Financial.divide(left, right);
console.log(divide.toString()); // "5"
```
