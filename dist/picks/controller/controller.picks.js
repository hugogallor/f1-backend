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
            if (penalty != -1)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5waWNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3BpY2tzL2NvbnRyb2xsZXIvY29udHJvbGxlci5waWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQiw2REFBb0M7QUFDcEMsc0RBQThEO0FBQzlELHVGQUE4RDtBQUc5RCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMzRCxNQUFNLGVBQWU7SUFDWCxNQUFNLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEQsd0VBQXdFO1lBQ3hFLGdFQUFnRTtZQUNoRSxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUEsOEJBQWEsRUFBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsOENBQThDO1lBQzlDLElBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQztnQkFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkUsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVELElBQUcsSUFBSSxJQUFJLElBQUksRUFBQztnQkFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFBQyxPQUFNO2FBQUU7WUFDaEQsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDL0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUM7Z0JBQ2hCLEtBQUssR0FBRyxNQUFNLG1CQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUM3RjtpQkFDRztnQkFDQSxLQUFLLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0lBRUksWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ2pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFUSxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25FLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJDLENBQUM7S0FBQTtJQUVLLG1CQUFtQixDQUFDLEdBQW9CLEVBQUUsR0FBb0I7O1lBQ25FLE1BQU0sVUFBVSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtDQUdIO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9