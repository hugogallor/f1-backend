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
            A: { type: Array, default: undefined }, //default undefined en los arreglos hace que no quiera siempre meter un arreglo vacio
            Q_id: { type: Number },
            R: { type: String },
            points: { type: Number },
        }
    ]
});
exports.default = F1InfoSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2YxaW5mby9mMWluZm8uc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyRkFBa0U7QUFHbEUsTUFBYyxZQUFZOztBQUExQixvQ0E2REM7O0FBNURHLDJGQUEyRjtBQUNwRixtQkFBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxBQUF2QyxDQUF3QztBQUVyRCxRQUFRO0FBQ0QseUJBQVksR0FBRyxJQUFJLEVBQUksQ0FBQyxNQUFNLENBQW1CO0lBQ3BELEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDbEIsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUN4QixRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3ZCLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDckIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNuQixlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0lBQy9CLE1BQU0sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7Q0FDdkIsQ0FBQyxBQVJlLENBUWQ7QUFHSCxNQUFNO0FBQ0QsdUJBQVUsR0FBRyxJQUFJLEVBQUksQ0FBQyxNQUFNLENBQWlCO0lBQ2hELEdBQUcsRUFBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDckIsSUFBSSxFQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNyQixRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3ZCLE9BQU8sRUFBQyxDQUFDLEVBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsRUFBRSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNqQixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3RCLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7Q0FFdkIsQ0FBQyxBQVRlLENBU2Y7QUFFQSxNQUFNO0FBQ0QsdUJBQVUsR0FBRyxJQUFJLEVBQUksQ0FBQyxNQUFNLENBQWlCO0lBQ2hELEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDbEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNuQixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3RCLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDdEIsT0FBTyxFQUFFLENBQUMsRUFBSSxDQUFDLFlBQVksQ0FBQztJQUM1QixVQUFVLEVBQUUsRUFBSSxDQUFDLFlBQVk7SUFDN0IsU0FBUyxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQzVCLGVBQWUsRUFBRSxFQUFJLENBQUMsWUFBWTtJQUNsQyxJQUFJLEVBQUUsRUFBSSxDQUFDLFlBQVk7SUFDdkIsU0FBUyxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQzVCLE9BQU8sRUFBRSxFQUFJLENBQUMsVUFBVTtJQUN4QixVQUFVLEVBQUMsQ0FBQyxFQUFJLENBQUMsWUFBWSxDQUFDO0lBQzlCLFFBQVEsRUFBRTtRQUNOLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDaEIsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztRQUNoQixHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO1FBQ2hCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDbEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztLQUNwQjtJQUNELFlBQVksRUFBQyxDQUFDLEVBQUksQ0FBQyxVQUFVLENBQUM7SUFDOUIsS0FBSyxFQUFDO1FBQ0Y7WUFDSSxDQUFDLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO1lBQ2YsQ0FBQyxFQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFDLEVBQUcscUZBQXFGO1lBQzFILElBQUksRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7WUFDbEIsQ0FBQyxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztZQUNmLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7U0FDeEI7S0FBQztDQUNQLENBQUMsQUE3QmEsQ0E2Qlo7QUFJVCxrQkFBZ0IsWUFBWSxDQUFDIn0=