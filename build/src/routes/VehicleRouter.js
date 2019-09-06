"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config = require("dotenv").config;
var config_1 = require("../../config/config");
var ConnectionPool = require("mssql").ConnectionPool;
var pg_1 = __importDefault(require("pg"));
var VehicleRouter = /** @class */ (function () {
    function VehicleRouter() {
        this.router = express_1.Router();
        config();
    }
    VehicleRouter.prototype.getVehicles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var pool, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, new ConnectionPool(config_1.c).connect()];
                    case 1:
                        pool = _a.sent();
                        return [4 /*yield*/, pool.request()
                                .query("SELECT * FROM vehicle")];
                    case 2:
                        result = _a.sent();
                        pool.close();
                        res.json(result.recordset);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VehicleRouter.prototype.getVehiclesPostgres = function (req, res) {
        try {
            var client_1 = new pg_1.default.Client({
                host: "172.24.4.40",
                user: "cm_learning",
                password: "A6Pw6qJkVfRqq5uV",
                database: "OctoBird",
                port: 5432
            });
            client_1.connect(function (err) {
                if (err)
                    res.json(err);
                else {
                    var query = {
                        text: "SELECT * FROM vehicle WHERE name = $1",
                        values: [
                            req.params.name
                        ]
                    };
                    client_1.query(query)
                        .then(function (data) { return res.json(data.rows); })
                        .catch(function (err) { return console.error("Ha ocurrrido un error en el metodo getVehivlePostgre " + JSON.stringify(err)); });
                }
            });
        }
        catch (error) {
            console.log("Ha ocurrrido un error en el metodo getVehivlePostgre " + JSON.stringify(error));
        }
    };
    VehicleRouter.prototype.getVehicle = function (req, res) {
        var id = req.params.id;
        var query = "SELECT * FROM vehicle WHERE id = " + id;
    };
    VehicleRouter.prototype.routes = function () {
        this.router.get('/getVehiclesPostgres', this.getVehicle);
        this.router.get('/getVehicles', this.getVehicles);
        this.router.get('/getVehicle/:id', this.getVehicle);
    };
    return VehicleRouter;
}());
var vehicleRoutes = new VehicleRouter();
vehicleRoutes.routes();
exports.default = vehicleRoutes.router;
