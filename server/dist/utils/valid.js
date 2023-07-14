"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEmail = void 0;
function validEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email));
}
exports.validEmail = validEmail;
