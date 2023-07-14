"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = void 0;
const capitalize = (sentence) => {
    return sentence.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};
exports.capitalize = capitalize;
