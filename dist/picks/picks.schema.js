"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.picksSchema = void 0;
const mongoose_service_1 = __importDefault(require("../common/services/mongoose.service"));
const f1info_schema_1 = require("../f1info/f1info.schema");
class picksSchema {
}
exports.picksSchema = picksSchema;
_a = picksSchema;
//todo static porque no hay que crear objeto de clase, solo queremos acceder a los miembros
picksSchema.Schema = mongoose_service_1.default.getMongoose().Schema;
//picks -extiende race y agrega userId
picksSchema.userPicks = new _a.Schema({
    userId: { type: String },
    userPoints: { type: Number },
    penalty: { type: Number },
    jokerDriver: { type: f1info_schema_1.F1InfoSchema.driverSchema },
    race: { type: f1info_schema_1.F1InfoSchema.raceSchema }
    //TODO agregar topteam
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Muc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3Muc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQSwyRkFBa0U7QUFDbEUsMkRBQXdEO0FBR3hELE1BQWMsV0FBVzs7QUFBekIsa0NBZUM7O0FBZEcsMkZBQTJGO0FBQ3BGLGtCQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEFBQXZDLENBQXdDO0FBRXJELHNDQUFzQztBQUMvQixxQkFBUyxHQUFJLElBQUksRUFBSSxDQUFDLE1BQU0sQ0FBcUI7SUFDcEQsTUFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNwQixVQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ3hCLE9BQU8sRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7SUFDdkIsV0FBVyxFQUFDLEVBQUUsSUFBSSxFQUFFLDRCQUFZLENBQUMsWUFBWSxFQUFFO0lBQy9DLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSw0QkFBWSxDQUFDLFVBQVUsRUFBQztJQUNyQyxzQkFBc0I7Q0FDekIsQ0FBQyxBQVBjLENBT2IifQ==