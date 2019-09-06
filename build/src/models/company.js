"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Company = /** @class */ (function () {
    function Company(data) {
        if (data.id != null) {
            this.id = data.id;
        }
        this.name = data.name;
        this.address = data.address;
        this.phone = data.phone;
    }
    return Company;
}());
exports.Company = Company;
