/**
 * @typedef { Json[] } JsonArray
 * @typedef { { readonly [key: string]: Json } } JsonObject
 * @typedef { boolean | number | string | null | JsonObject | JsonArray } Json
*/

/** @enum { number } */
const JSON_TYPE = {
    string: 0,
    number: 1,
    object: 2,
    array: 3,
    boolean: 4,
    null: 5
}

/**
 * @param { Json } value 
 * @returns { JSON_TYPE }
 */
function getType(value) {
    switch (typeof value) {
        case "string":
            return JSON_TYPE.string;
        case "number":
            return JSON_TYPE.number;
        case "boolean":
            return JSON_TYPE.boolean;
        case "object":
            if (value === null) return JSON_TYPE.null;
            if (Array.isArray(value)) return JSON_TYPE.array;
            return JSON_TYPE.object;

        default: throw new Error("unreachable");
    }
}

/**
 * @param { JsonObject } actual 
 * @param { JsonObject } expected 
 * @returns { boolean }
 */
function deepEqualObjects(actual, expected) {
    const l = Object.keys(expected).length;
    let i = 0;
    for (const key in actual) {
        if (!(key in expected)) return false;
        if (!deepEqual(actual[key], expected[key])) return false
        i++;
    }
    return i == l;
}

/**
 * @param { JsonArray } actual 
 * @param { JsonArray } expected 
 * @returns { boolean }
 */
function deepEqualArray(actual, expected) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
        if (!deepEqual(actual[i], expected[i])) return false;
    }
    return true;
}

/**
 * 
 * @param { Json } actual 
 * @param { Json} expected 
 * @returns { boolean }
 */
function deepEqual(actual, expected) {
    const type = getType(actual);
    if (type !== getType(expected)) return false;
    switch (type) {
        case JSON_TYPE.string:
        case JSON_TYPE.number:
        case JSON_TYPE.boolean:
        case JSON_TYPE.null:
            return actual === expected;
        case JSON_TYPE.object:
            return deepEqualObjects(/** @type { JsonObject } */(actual), /** @type { JsonObject } */(expected))
        case JSON_TYPE.array:
            return deepEqualArray(/** @type { JsonArray } */(actual), /** @type { JsonArray } */(expected));
        default: throw new TypeError("unexpected type");
    }

}

const wrap = /** @type { (actual: unknown, expected: unknown) => boolean } */(deepEqual);

export {
    wrap as deepEqual
}