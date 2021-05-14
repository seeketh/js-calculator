// Constant variables
export const INIT = 0;
export const STRING_INIT = "0";
export const LONG = 1;
export const SHORT = 0;
export const ENTRY_MAX = 12;
export const ON = true;
export const OFF = false;
export const POWER_ON = "power-switch-on";
export const POWER_OFF = "power-switch-off";
export const DISPLAY_ON = "active-display";
export const DISPLAY_ON_HB = "active-hb-display"; // hb - high brightness
export const DISPLAY_OFF = "inactive-display";
export const ACTIVE_KEY = "active-key";
export const INACTIVE_KEY = "inactive-key";
export const ACTIVE_LONG_KEY = "active-long-key";
export const INACTIVE_LONG_KEY = "inactive-long-key";
export const ACTIVATED_HB_KEY = "activated-hb-key";
export const LONG_KEY = "long-key";
export const HB_KEY= "B";
export const ENTRY_MAX_MSG = "MAXIMUM SIZE REACHED";
export const FORMULA_MAX_MSG = "MAXIMUM INPUT REACHED";
export const KEYS = {
    one: {type: 0, id: "one", value: "1"},
    two: {type: 0, id: "two", value: "2"},
    three: {type: 0, id: "three", value: "3"},
    four: {type: 0, id: "four", value: "4"},
    five: {type: 0, id: "five", value: "5"},
    six: {type: 0, id: "six", value: "6"},
    seven: {type: 0, id: "seven", value: "7"},
    eight: {type: 0, id: "eight", value: "8"},
    nine: {type: 0, id: "nine", value: "9"},
    zero: {type: 0, id: "zero", value: "0"},
    decimal: {type: 0, id: "decimal", value: "."},
    equals: {type: 1, id: "equals", value: "="},
    add: {type: 0, id: "add", value: "+"},
    subtract: {type: 0, id: "subtract", value: "-"},
    divide: {type: 0, id: "divide", value: "/"},
    multiply: {type: 0, id: "multiply", value: "*"},
    clear: {type: 1, id: "clear", value: "C"},
    brightness: {type: 0, id: "brighness", value: "B"}
};
// Ordered keyboard keys
export const ORDERED_KEY_NAMES = [
    "clear",
    "brightness",
    "multiply",
    "one",
    "two",
    "three",
    "divide",
    "four",
    "five",
    "six",
    "subtract",
    "seven",
    "eight",
    "nine",
    "add",
    "zero",
    "decimal",
    "equals"
];
