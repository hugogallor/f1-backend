"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var mongoose_service_1 = require("../common/services/mongoose.service");
var debug_1 = require("debug");
var f1info_schema_1 = require("./f1info.schema");
var log = (0, debug_1["default"])('app: f1info dao');
var F1infoDao = /** @class */ (function () {
    function F1infoDao() {
        /*Schema = mongooseService.getMongoose().Schema;
        
        //schema for data representation
        raceSchema = new this.Schema<race>();
        teamSchema = new this.Schema<team>();
        //chance esta manera de representar un arreglo de schema no es necesaria
        teamsSchema = new this.Schema({
            teams:[new this.Schema<team>()]
        })
        driverSchema = new this.Schema<driver>();
        driversSchema = new this.Schema({
            drivers: [new this.Schema<driver>()],
        })*/
        //models for data storage
        this.driverSchema = f1info_schema_1.F1InfoSchema.driverSchema;
        this.raceSchema = f1info_schema_1.F1InfoSchema.raceSchema;
        this.teamSchema = f1info_schema_1.F1InfoSchema.teamSchema;
        this.drivers = mongoose_service_1["default"].getMongoose().model('drivers', this.driverSchema);
        this.teams = mongoose_service_1["default"].getMongoose().model('teams', this.teamSchema);
        this.race = mongoose_service_1["default"].getMongoose().model('races', this.raceSchema);
        log('Created new instance of f1Info Dao');
    }
    F1infoDao.prototype.getDrivers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.drivers.find().exec()]; //tenía .populate('User') antes de exec. Pero crasheaba porque?
            });
        });
    };
    F1infoDao.prototype.getTeams = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.teams.find().exec()];
            });
        });
    };
    F1infoDao.prototype.getRaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.race.find().sort({ race_id: "asc" }).exec()];
            });
        });
    };
    F1infoDao.prototype.getRace = function (raceNumber) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.race.findOne({ race_id: raceNumber }).exec()];
            });
        });
    };
    F1infoDao.prototype.patchRaceTop5 = function (raceNumber, raceResults) {
        return __awaiter(this, void 0, void 0, function () {
            var dnfResults, race, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("patch race results " + raceResults.dnfResults);
                        dnfResults = raceResults.dnfResults.filter(function (driver) {
                            if (driver.firstName != "Selecciona")
                                return driver;
                        });
                        race = {
                            results: raceResults.top5,
                            fastestLap: raceResults.extraFastLap,
                            lastPlace: raceResults.extraLast,
                            dnfResults: dnfResults,
                            pole: raceResults.extraPole
                        };
                        return [4 /*yield*/, this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: race }, { "new": true })];
                    case 1:
                        result = _a.sent();
                        if (result != null) {
                            // log("f1info.dao results",result.results);
                            return [2 /*return*/, 1];
                        }
                        return [2 /*return*/, -1];
                }
            });
        });
    };
    F1infoDao.prototype.patchRaceQuestions = function (raceNumber, questions) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadQ, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadQ = {
                            bonus: __spreadArray([], questions, true)
                        };
                        return [4 /*yield*/, this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: uploadQ }, { "new": true })];
                    case 1:
                        result = _a.sent();
                        log("updateQA", result);
                        return [2 /*return*/];
                }
            });
        });
    };
    F1infoDao.prototype.patchPositionsGained = function (raceNumber, teams) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadTeams, result, changedRace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadTeams = {
                            team_rosters: __spreadArray([], teams, true)
                        };
                        return [4 /*yield*/, this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: uploadTeams }, { "new": true })];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            changedRace = result;
                            return [2 /*return*/, changedRace];
                        }
                        return [2 /*return*/, -1];
                }
            });
        });
    };
    return F1infoDao;
}());
exports["default"] = new F1infoDao();
