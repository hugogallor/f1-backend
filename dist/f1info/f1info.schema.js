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
});
//team
F1InfoSchema.teamSchema = new _a.Schema({
    _id: { type: String },
    name: { type: String },
    colorHex: { type: String },
    driver1: _a.driverSchema,
    driver2: _a.driverSchema,
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
            A: [{ type: String }],
            Q_id: { type: Number },
        }
    ]
});
exports.default = F1InfoSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2YxaW5mby9mMWluZm8uc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyRkFBa0U7QUFHbEUsTUFBYyxZQUFZOztBQUExQixvQ0FzREM7O0FBckRHLDJGQUEyRjtBQUNwRixtQkFBTSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDO0FBRXJELFFBQVE7QUFDRCx5QkFBWSxHQUFHLElBQUksRUFBSSxDQUFDLE1BQU0sQ0FBbUI7SUFDcEQsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNsQixTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3hCLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDdkIsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNyQixJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0NBQ3BCLENBQUUsQ0FBQTtBQUdILE1BQU07QUFDRCx1QkFBVSxHQUFHLElBQUksRUFBSSxDQUFDLE1BQU0sQ0FBaUI7SUFDaEQsR0FBRyxFQUFLLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNyQixJQUFJLEVBQUksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3JCLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDdkIsT0FBTyxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQzFCLE9BQU8sRUFBRSxFQUFJLENBQUMsWUFBWTtJQUMxQixFQUFFLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ2pCLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7Q0FFekIsQ0FBQyxDQUFBO0FBRUEsTUFBTTtBQUNELHVCQUFVLEdBQUcsSUFBSSxFQUFJLENBQUMsTUFBTSxDQUFpQjtJQUNoRCxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ2xCLElBQUksRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDbkIsT0FBTyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUN0QixPQUFPLEVBQUUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3RCLE9BQU8sRUFBRSxDQUFDLEVBQUksQ0FBQyxZQUFZLENBQUM7SUFDNUIsVUFBVSxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQzdCLFNBQVMsRUFBRSxFQUFJLENBQUMsWUFBWTtJQUM1QixlQUFlLEVBQUUsRUFBSSxDQUFDLFlBQVk7SUFDbEMsSUFBSSxFQUFFLEVBQUksQ0FBQyxZQUFZO0lBQ3ZCLFFBQVEsRUFBRTtRQUNOLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDaEIsR0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztRQUNoQixHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO1FBQ2hCLEtBQUssRUFBRSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUM7UUFDbEIsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztLQUNwQjtJQUNELFlBQVksRUFBQyxDQUFDLEVBQUksQ0FBQyxVQUFVLENBQUM7SUFDOUIsS0FBSyxFQUFDO1FBQ0Y7WUFDSSxDQUFDLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO1lBQ2YsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7WUFDakIsSUFBSSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztTQUNyQjtLQUFDO0NBQ1AsQ0FBRSxDQUFBO0FBSVQsa0JBQWdCLFlBQVksQ0FBQyJ9