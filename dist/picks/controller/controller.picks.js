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
const debug_1 = __importDefault(require("debug"));
const picks_dao_1 = __importDefault(require("../picks.dao"));
const picks_services_1 = require("../picks.services");
const users_service_1 = __importDefault(require("../../users/services/users.service"));
const log = (0, debug_1.default)('app:picks-controller');
class PicksController {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //hace falta middleware para checar que req.body sea igual a picks.dto ?
            //servicio para revisar si genera penalización por tiemop subido
            const penalty = yield (0, picks_services_1.cutOffPenalty)(req.params.userId, req.body);
            //enviadas ya empezada FP3 o qualy, no cuentan
            if (penalty === -1)
                return;
            req.body.penalty = penalty;
            const result = yield picks_dao_1.default.uploadPicks(req.params.userId, req.body);
            const user = yield users_service_1.default.readById(req.params.userId);
            if (user == null) {
                res.status(404).send;
                return;
            }
            (0, picks_services_1.emailPicks)(user.email, req.body);
            res.status(200).send();
        });
    }
    getPicksByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let picks = null;
            if (req.query.raceId) {
                picks = yield picks_dao_1.default.getUserPicksByRace(req.params.userId, req.query.raceId.toString());
            }
            else {
                picks = yield picks_dao_1.default.getUserPicks(req.params.userId);
            }
            res.status(200).send(picks);
        });
    }
    getStandings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const standings = yield picks_dao_1.default.aggregateStandings();
            res.status(200).send(standings);
        });
    }
    getRaceStandings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const standings = yield picks_dao_1.default.raceStandings(req.params.raceId);
            res.status(200).send(standings);
        });
    }
    userRaces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRaces = yield picks_dao_1.default.racesBreakdown(req.params.userId);
            res.status(200).send(userRaces);
        });
    }
    cumulativeBreakdown(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cumulative = yield picks_dao_1.default.cumulativePoints();
            res.status(200).send(cumulative);
        });
    }
}
exports.default = new PicksController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5waWNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3BpY2tzL2NvbnRyb2xsZXIvY29udHJvbGxlci5waWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQiw2REFBb0M7QUFDcEMsc0RBQThEO0FBQzlELHVGQUE4RDtBQUc5RCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGVBQWU7SUFDWCxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEQsd0VBQXdFO1lBQ3hFLGdFQUFnRTtZQUNoRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsOEJBQWEsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsOENBQThDO1lBQzlDLElBQUcsT0FBTyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFNO1lBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RSxNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUQsSUFBRyxJQUFJLElBQUksSUFBSSxFQUFDO2dCQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUFDLE9BQU07YUFBRTtZQUNoRCxJQUFBLDJCQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMvRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQztnQkFDaEIsS0FBSyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQzdGO2lCQUNHO2dCQUNBLEtBQUssR0FBRyxNQUFNLG1CQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUQ7WUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFFSSxZQUFZLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDekQsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDakUsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVRLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN0RCxNQUFNLFNBQVMsR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFckMsQ0FBQztLQUFBO0lBRUssbUJBQW1CLENBQUMsR0FBb0IsRUFBRSxHQUFvQjs7WUFDbkUsTUFBTSxVQUFVLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0NBR0g7QUFFRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=