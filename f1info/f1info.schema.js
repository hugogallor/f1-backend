"use strict";
exports.__esModule = true;
exports.F1InfoSchema = void 0;
var mongoose_service_1 = require("../common/services/mongoose.service");
var F1InfoSchema = /** @class */ (function () {
    function F1InfoSchema() {
    }
    var _a;
    _a = F1InfoSchema;
    //todo static porque no hay que crear objeto de clase, solo queremos acceder a los miembros
    F1InfoSchema.Schema = mongoose_service_1["default"].getMongoose().Schema;
    //driver
    F1InfoSchema.driverSchema = new _a.Schema({
        _id: { type: String },
        firstName: { type: String },
        lastName: { type: String },
        number: { type: Number },
        team: { type: String },
        positionsGained: { type: Number },
        points: { type: Number }
    });
    //team
    F1InfoSchema.teamSchema = new _a.Schema({
        _id: { type: String },
        name: { type: String },
        colorHex: { type: String },
        drivers: [_a.driverSchema],
        PU: { type: String },
        logoUrl: { type: String }
    });
    //race
    F1InfoSchema.raceSchema = new _a.Schema({
        _id: { type: String },
        name: { type: String },
        race_id: { type: Number },
        country: { type: String },
        results: [_a.driverSchema],
        fastestLap: _a.driverSchema,
        lastPlace: _a.driverSchema,
        firstRetirement: _a.driverSchema,
        pole: _a.driverSchema,
        schedule: {
            FP1: { type: Date },
            FP2: { type: Date },
            FP3: { type: Date },
            Qualy: { type: Date },
            Race: { type: Date }
        },
        team_rosters: [_a.teamSchema],
        bonus: [
            {
                Q: { type: String },
                A: { type: Array, "default": undefined },
                Q_id: { type: Number },
                R: { type: String },
                points: { type: Number }
            }
        ]
    });
    return F1InfoSchema;
}());
exports.F1InfoSchema = F1InfoSchema;
exports["default"] = F1InfoSchema;
