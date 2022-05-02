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
const log = (0, debug_1.default)('app:picks-controller');
class PicksController {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //hace falta middleware para checar que req.body sea igual a picks.dto ?
            const result = yield picks_dao_1.default.uploadPicks(req.params.userId, req.body);
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
}
exports.default = new PicksController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5waWNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3BpY2tzL2NvbnRyb2xsZXIvY29udHJvbGxlci5waWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQiw2REFBb0M7QUFFcEMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQ1gsTUFBTSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3BELHdFQUF3RTtZQUN4RSxNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQy9ELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDO2dCQUNoQixLQUFLLEdBQUcsTUFBTSxtQkFBUSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDN0Y7aUJBQ0c7Z0JBQ0EsS0FBSyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxRDtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtDQUlKO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9