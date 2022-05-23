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
exports.PicksDao = void 0;
const mongoose_service_1 = __importDefault(require("../common/services/mongoose.service"));
const debug_1 = __importDefault(require("debug"));
const picks_schema_1 = require("./picks.schema");
const log = (0, debug_1.default)('app: picks dao');
class PicksDao {
    constructor() {
        //Schema
        this.picksSchema = picks_schema_1.picksSchema.userPicks;
        //Models
        this.userPicksUpload = mongoose_service_1.default.getMongoose().model('picks', this.picksSchema);
    }
    //DB operations
    uploadPicks(userId, picksData) {
        return __awaiter(this, void 0, void 0, function* () {
            //insertamos datos que se enviaron en el body del PUT
            //sin el _id:false mongoose intenta meter otro _id y falla porque es inmutable
            const picks = new this.userPicksUpload(Object.assign({}, picksData), { _id: false });
            //find one and update with upsert crea el documento si no existe, lo actualiza si ya existe
            // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
            const result = this.userPicksUpload.findOneAndUpdate({ userId: userId, 'race.race_id': picksData.race.race_id }, { $set: picks }, { upsert: true, new: true });
            return result;
        });
    }
    getUserPicks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userPicksUpload.find({ userId: userId }).exec();
        });
    }
    getUserPicksByRace(userId, raceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const raceNumber = parseInt(raceId);
                //no se por que no puedo asignarle a query el tipo userPicks
                const query = yield this.userPicksUpload.findOne({ userId: userId, "race.race_id": raceNumber });
                return query;
            }
            catch (error) {
                log(error);
                return -1;
            }
        });
    }
}
exports.PicksDao = PicksDao;
exports.default = new PicksDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJGQUFrRTtBQUNsRSxrREFBMEI7QUFDMUIsaURBQTZDO0FBSTdDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXJELE1BQWEsUUFBUTtJQUFyQjtRQUNHLFFBQVE7UUFDUCxnQkFBVyxHQUFHLDBCQUFXLENBQUMsU0FBUyxDQUFDO1FBRXJDLFFBQVE7UUFDUCxvQkFBZSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUF1Q3JGLENBQUM7SUFyQ0csZUFBZTtJQUNULFdBQVcsQ0FBQyxNQUFjLEVBQUUsU0FBb0I7O1lBQ2xELHFEQUFxRDtZQUNyRCw4RUFBOEU7WUFDOUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsZUFBZSxtQkFDL0IsU0FBUyxHQUNkLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUE7WUFDZCwyRkFBMkY7WUFDM0YsOERBQThEO1lBQzlELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQ2hELEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDdEQsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEVBQ1osRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBQyxJQUFJLEVBQUMsQ0FDckIsQ0FBQztZQUNSLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLFlBQVksQ0FBQyxNQUFjOztZQUM3QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUQsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsTUFBYyxFQUFFLE1BQWE7O1lBQ2xELElBQUc7Z0JBQ0MsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwQyw0REFBNEQ7Z0JBQzVELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO2dCQUMvRixPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUNELE9BQU0sS0FBSyxFQUFDO2dCQUNSLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7UUFFTCxDQUFDO0tBQUE7Q0FJSjtBQTVDRCw0QkE0Q0M7QUFDRCxrQkFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDIn0=