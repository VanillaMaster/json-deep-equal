# @vanilla/json-deep-equal
Tests for deep equality between json values

## requirements
*none*

## installation
```
npm install git+https://github.com/VanillaMaster/json-deep-equal.git
```

## example
```JavaScript
import deepEqual from "@vanilla/json-deep-equal";

const a = { a: [ 42 ], b: "42" }
const b = { b: "42", a: [ 42 ] }
const eaqual = deepEqual(a, b); // true
```