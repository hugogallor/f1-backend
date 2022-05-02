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
            return this.race.find().exec();
        });
    }
    getRace(raceNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.race.findOne({ race_id: raceNumber }).exec();
        });
    }
}
exports.default = new F1infoDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2YxaW5mby9mMWluZm8uZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkZBQWtFO0FBRWxFLGtEQUEwQjtBQUMxQixtREFBK0M7QUFFL0MsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFdEQsTUFBTSxTQUFTO0lBc0JYO1FBckJBOzs7Ozs7Ozs7Ozs7WUFZSTtRQUNKLHlCQUF5QjtRQUN6QixpQkFBWSxHQUFJLDRCQUFZLENBQUMsWUFBWSxDQUFDO1FBQzFDLGVBQVUsR0FBSSw0QkFBWSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxlQUFVLEdBQUksNEJBQVksQ0FBQyxVQUFVLENBQUM7UUFDdEMsWUFBTyxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUUsVUFBSyxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsU0FBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFHaEUsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUVLLFVBQVU7O1lBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUUsK0RBQStEO1FBQ3ZHLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBR1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxVQUFrQjs7WUFDNUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVELENBQUM7S0FBQTtDQUNKO0FBQ0Qsa0JBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQyJ9