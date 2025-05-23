"use strict";
//const axios = require('axios').default;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
exports.getPositionsGained = void 0;
var axios_1 = require("axios");
var cheerio = require('cheerio');
//console.log("hey")
var gridUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/starting-grid";
var resultsUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/race-result";
//addPositionsGained();
function getPositionsGained(gridUrl, resultsUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var driverGrid, driverResult, gained, response, $_1, driver, responseR, driverR, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driverGrid = [];
                    driverResult = [];
                    gained = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].get(gridUrl)];
                case 2:
                    response = _a.sent();
                    $_1 = cheerio.load(response.data);
                    driver = $_1('.f1-table tr td:nth-child(2)');
                    //console.log(driver)
                    driver.each(function (i, element) {
                        //console.log(i, $(element).text());
                        driverGrid.push(parseInt($_1(element).text()));
                    });
                    return [4 /*yield*/, axios_1["default"].get(resultsUrl)];
                case 3:
                    responseR = _a.sent();
                    $_1 = cheerio.load(responseR.data);
                    driverR = $_1('.f1-table tr td:nth-child(2)');
                    driverR.each(function (i, element) {
                        //console.log(i, $(element).text());
                        driverResult.push(parseInt($_1(element).text()));
                    });
                    //console.log(driverResult);
                    gained = driverGrid.map(function (grid, i) { return i - driverResult.indexOf(grid); });
                    //console.log("gained");
                    //console.log(gained);
                    return [2 /*return*/, ({ drivers: driverGrid, gained: gained })];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getPositionsGained = getPositionsGained;
function addPositionsGained() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getPositionsGained(gridUrl, resultsUrl)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res];
            }
        });
    });
}
