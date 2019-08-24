"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Company = /** @class */ (function () {
    function Company(data) {
        this.data = data;
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.address = data.address;
            this.tel = data.tel;
        }
        /*
            public name?: string
        */
    }
    return Company;
}());
exports.Company = Company;
