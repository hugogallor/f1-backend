"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1InfoSchema = void 0;
const mongoose_service_1 = __importDefault(require("../common/services/mongoose.service"));
class F1InfoSchema {
}
exports.F1InfoSchema = F1InfoSchema;
_a = F1InfoSchema;
//todo static porque no hay que crear objeto de clase, solo queremos acceder a los miembros
F1InfoSchema.Schema = mongoose_service_1.default.getMongoose().Schema;
//driver
F1InfoSchema.driverSchema = new _a.Schema({
    _id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    number: { type: Number },
    team: { type: String },
    positionsGained: { type: Number },
    points: { type: Number },
});
//team
F1InfoSchema.teamSchema = new _a.Schema({
    _id: { type: String },
    name: { type: String },
    colorHex: { type: String },
    drivers: [_a.driverSchema],
    PU: { type: String },
    logoUrl: { type: String },
    points: { type: Number },
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
    raceJoker: _a.driverSchema,
    topTeam: _a.teamSchema,
    dnfResults: [_a.driverSchema],
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
            A: { type: Array, default: undefined },
            Q_id: { type: Number },
            R: { type: String },
            points: { type: Number },
        }
    ]
});
exports.default = F1InfoSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2YxaW5mby9mMWluZm8uc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyRkFBa0U7QUFHbEUsTUFBYyxZQUFZOztBQUExQixvQ0E2REM7O0FBNURHLDJGQUEyRjtBQUNwRixtQkFBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBRXJELFFBQVE7QUFDRCx5QkFBWSxHQUFHLElBQUksRUFBSSxDQUFDLE1BQU0sQ0FBbUI7SUFDcEQsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNsQixTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3hCLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDdkIsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNyQixJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ25CLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDL0IsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztDQUN2QixDQUFDLENBQUM7QUFHSCxNQUFNO0FBQ0QsdUJBQVUsR0FBRyxJQUFJLEVBQUksQ0FBQyxNQUFNLENBQWlCO0lBQ2hELEdBQUcsRUFBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDckIsSUFBSSxFQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNyQixRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3ZCLE9BQU8sRUFBQyxDQUFDLEVBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNqQixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3RCLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7Q0FFdkIsQ0FBQyxDQUFBO0FBRUEsTUFBTTtBQUNELHVCQUFVLEdBQUcsSUFBSSxFQUFJLENBQUMsTUFBTSxDQUFpQjtJQUNoRCxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ2xCLElBQUksRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDbkIsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUN0QixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLEVBQUksQ0FBQyxZQUFZLENBQUM7SUFDNUIsVUFBVSxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQzdCLFNBQVMsRUFBRSxFQUFJLENBQUMsWUFBWTtJQUM1QixlQUFlLEVBQUUsRUFBSSxDQUFDLFlBQVk7SUFDbEMsSUFBSSxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQ3ZCLFNBQVMsRUFBRSxFQUFJLENBQUMsWUFBWTtJQUM1QixPQUFPLEVBQUUsRUFBSSxDQUFDLFVBQVU7SUFDeEIsVUFBVSxFQUFDLENBQUMsRUFBSSxDQUFDLFlBQVksQ0FBQztJQUM5QixRQUFRLEVBQUU7UUFDTixHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO1FBQ2hCLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDaEIsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztRQUNoQixLQUFLLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO1FBQ2xCLElBQUksRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7S0FDcEI7SUFDRCxZQUFZLEVBQUMsQ0FBQyxFQUFJLENBQUMsVUFBVSxDQUFDO0lBQzlCLEtBQUssRUFBQztRQUNGO1lBQ0ksQ0FBQyxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztZQUNmLENBQUMsRUFBQyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQztZQUNsQyxJQUFJLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO1lBQ2xCLENBQUMsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7WUFDZixNQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO1NBQ3hCO0tBQUM7Q0FDUCxDQUFDLENBQUM7QUFJVCxrQkFBZ0IsWUFBWSxDQUFDIn0=