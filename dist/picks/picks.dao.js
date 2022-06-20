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
const picks_dto_1 = require("./picks.dto");
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
    aggregateStandings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const standings = yield this.userPicksUpload.aggregate(picks_dto_1.standingsAggregation);
                return standings;
            }
            catch (error) {
                log(error);
                return -1;
            }
        });
    }
    racesBreakdown(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRaces = yield this.userPicksUpload.aggregate((0, picks_dto_1.getBreakdownPipeline)(userId));
            return userRaces;
        });
    }
}
exports.PicksDao = PicksDao;
exports.default = new PicksDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3MuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcGlja3MvcGlja3MuZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJGQUFrRTtBQUNsRSxrREFBMEI7QUFDMUIsaURBQTZDO0FBRTdDLDJDQUFvRjtBQUVwRixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUVyRCxNQUFhLFFBQVE7SUFBckI7UUFDRyxRQUFRO1FBQ1AsZ0JBQVcsR0FBRywwQkFBVyxDQUFDLFNBQVMsQ0FBQztRQUVyQyxRQUFRO1FBQ1Asb0JBQWUsR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBcURyRixDQUFDO0lBbkRHLGVBQWU7SUFDVCxXQUFXLENBQUMsTUFBYyxFQUFFLFNBQW9COztZQUNsRCxxREFBcUQ7WUFDckQsOEVBQThFO1lBQzlFLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLGVBQWUsbUJBQy9CLFNBQVMsR0FDZCxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO1lBQ2QsMkZBQTJGO1lBQzNGLDhEQUE4RDtZQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUNoRCxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsY0FBYyxFQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ3RELEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxFQUNaLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUMsSUFBSSxFQUFDLENBQ3JCLENBQUM7WUFDUixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFSyxZQUFZLENBQUMsTUFBYzs7WUFDN0IsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzlELENBQUM7S0FBQTtJQUVLLGtCQUFrQixDQUFDLE1BQWMsRUFBRSxNQUFhOztZQUNsRCxJQUFHO2dCQUNDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEMsNERBQTREO2dCQUM1RCxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDL0YsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFDRCxPQUFNLEtBQUssRUFBQztnQkFDUixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO1FBRUwsQ0FBQztLQUFBO0lBRUssa0JBQWtCOztZQUNwQixJQUFHO2dCQUNDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsZ0NBQW9CLENBQUMsQ0FBQztnQkFDN0UsT0FBTyxTQUFTLENBQUM7YUFDcEI7WUFDRCxPQUFNLEtBQUssRUFBQztnQkFDUixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNiO1FBQ0wsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLE1BQWM7O1lBQy9CLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBQSxnQ0FBb0IsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3JGLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtDQUVKO0FBMURELDRCQTBEQztBQUNELGtCQUFlLElBQUksUUFBUSxFQUFFLENBQUMifQ==