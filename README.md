# Financial.JS

Finance JS is a data type for storing decimal values and manipulate its via mathematical functions according infinite-precision arithmetic. It should be used when it is important to preserve exact precision, for example with monetary data.

###### Problems of JavaScript [IEEE 754 floating point numbers](https://en.wikipedia.org/wiki/IEEE_754).
##### Approximation
```JAVASCRIPT
const totalMoney = 600.9;
const pricePerItem = 200.3;
const totalSpent = pricePerItem * 3;

console.log(totalMoney === totalSpent); // false (while expected true)
console.log(totalSpent); // 600.9000000000001
```
##### Digits limit
```JAVASCRIPT
const left = parseInt("123456789012345678901234567890");
const right = parseInt("1");
const result = left + right;
console.log(result); // 1.2345678901234568e+29 (while expected 123456789012345678901234567891)
```

## Usage

Financial.js can be used in node.js.

Install financial.js using npm:
```BASH
npm i @zxteam/financial.js
```

### Examples

You can see a lot of examples in unit tests. Here we show some points only.

### Avoid approximation

```JAVASCRIPT
import { financial, Financial } from "financial.js";

const totalMoney = financial(600.90, 2);
const pricePerItem = financial(200.30, 2);
const buyItems = financial(3);
const totalSpent = Financial.multiply(pricePerItem, buyItems);

console.log(Financial.equalsTo(totalMoney, totalSpent)); // true
console.log(totalSpent.toString()); // 600.9
```
### Avoid digits limit

```JAVASCRIPT
import { financial, Financial } from "@zxteam/financial.js";

const left = financial("123456789012345678901234567890");
const right = financial("1");
const result = Financial.plus(left, right);
console.log(result.toString()); // 123456789012345678901234567891
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [Examples](docs/functions.md#example)
- [Overview](docs/functions.md)

## Build

First clone the project from github:

```BASH
git clone https://dev.zxteam.net/pub/node/financial.js.git
cd financial.js
```

Install the project dependencies:
```BASH
npm install
```

Then, the project can be build by executing the build script via npm:
```BASH
npm run build
```

This will build the library financial.js from the source files and
put them in the folder /.dist

## Test

To execute tests for the library, install the project dependencies once:
```BASH
npm install
```

Then, the tests can be executed:
```BASH
npm run test
```

To see the coverage results, open the generated report in your browser:

```BASH
./coverage/lcov-report/index.html
```

## License

Copyright [2018-2019] ZXTeam.org

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
