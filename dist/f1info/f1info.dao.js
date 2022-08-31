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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("../common/services/mongoose.service"));
const debug_1 = __importDefault(require("debug"));
const f1info_schema_1 = require("./f1info.schema");
const log = (0, debug_1.default)('app: f1info dao');
class F1infoDao {
    constructor() {
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
        this.drivers = mongoose_service_1.default.getMongoose().model('drivers', this.driverSchema);
        this.teams = mongoose_service_1.default.getMongoose().model('teams', this.teamSchema);
        this.race = mongoose_service_1.default.getMongoose().model('races', this.raceSchema);
        log('Created new instance of f1Info Dao');
    }
    getDrivers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.drivers.find().exec(); //tenía .populate('User') antes de exec. Pero crasheaba porque?
        });
    }
    getTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.teams.find().exec();
        });
    }
    getRaces() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.race.find().sort({ race_id: "asc" }).exec();
        });
    }
    getRace(raceNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.race.findOne({ race_id: raceNumber }).exec();
        });
    }
    patchRaceTop5(raceNumber, raceResults) {
        return __awaiter(this, void 0, void 0, function* () {
            let dnfResults;
            console.log("patch race results " + raceResults.dnfResults);
            dnfResults = raceResults.dnfResults.filter((driver) => {
                if (driver.firstName != "Selecciona")
                    return driver;
            });
            const race = {
                results: raceResults.top5,
                fastestLap: raceResults.extraFastLap,
                lastPlace: raceResults.extraLast,
                dnfResults: dnfResults,
                pole: raceResults.extraPole,
            };
            //log("f1info.dao data",race);
            const result = yield this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: race }, { new: true });
            if (result != null) {
                // log("f1info.dao results",result.results);
                return 1;
            }
            return -1;
        });
    }
    patchRaceQuestions(raceNumber, questions) {
        return __awaiter(this, void 0, void 0, function* () {
            let uploadQ = {
                bonus: [...questions],
            };
            const result = yield this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: uploadQ }, { new: true });
            log("updateQA", result);
        });
    }
    patchPositionsGained(raceNumber, teams) {
        return __awaiter(this, void 0, void 0, function* () {
            let uploadTeams = {
                team_rosters: [...teams],
            };
            const result = yield this.race.findOneAndUpdate({ race_id: raceNumber }, { $set: uploadTeams }, { new: true });
            if (result) {
                const changedRace = result;
                return changedRace;
            }
            return -1;
        });
    }
}
exports.default = new F1infoDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2YxaW5mby9mMWluZm8uZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkZBQWtFO0FBRWxFLGtEQUEwQjtBQUMxQixtREFBK0M7QUFFL0MsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFdEQsTUFBTSxTQUFTO0lBMkJYO1FBMUJBOzs7Ozs7Ozs7Ozs7WUFZSTtRQUNKLHlCQUF5QjtRQUN6QixpQkFBWSxHQUFJLDRCQUFZLENBQUMsWUFBWSxDQUFDO1FBQzFDLGVBQVUsR0FBSSw0QkFBWSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxlQUFVLEdBQUksNEJBQVksQ0FBQyxVQUFVLENBQUM7UUFHdEMsWUFBTyxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUUsVUFBSyxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsU0FBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFNaEUsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUVLLFVBQVU7O1lBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUUsK0RBQStEO1FBQ3ZHLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBR1YsT0FB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