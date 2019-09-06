"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Company = /** @class */ (function () {
    function Company(data) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.addres = data.addres;
            this.telephone = data.telephone;
        }
    }
    return Company;
}());
exports.Company = Company;
