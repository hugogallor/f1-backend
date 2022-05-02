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
const f1info_dao_1 = __importDefault(require("../../f1info/f1info.dao"));
const f1info_service_1 = __importDefault(require("../services/f1info.service"));
const log = (0, debug_1.default)('app:f1info-controller');
class F1InfoController {
    constructor() {
        log('Created new instance of F1InfoController');
        //bind
    }
    listTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const teams = yield f1info_dao_1.default.getTeams();
            res.status(200).send(teams);
        });
    }
    listRaces(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const races = yield f1info_dao_1.default.getRaces();
            res.status(200).send(races);
        });
    }
    getRaceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const raceIdNumber = parseInt(req.params.raceId); //se vale en ts? deberia esto ser un servicio?
            const race = yield f1info_dao_1.default.getRace(raceIdNumber);
            res.status(200).send(race);
        });
    }
    generateCurrentRaceInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //cliente espera respuesta en objeto con este formato
            //crear objetos basados en interfaces https://stackoverflow.com/questions/13142635/how-can-i-create-an-object-based-on-an-interface-file-definition-in-typescript
            let currentRace = {
                //inCutOff: false, //no hace falta porque cliente se basa en nextCutOff para saber si bloquear
                nextCutOff: "",
                nextRace: {},
            };
            const dateNow = new Date();
            const raceSchedule = yield f1info_dao_1.default.getRaces();
            const firstMatch = f1info_service_1.default.findNextRace(dateNow, raceSchedule);
            if (firstMatch !== undefined) {
                currentRace.nextRace = firstMatch;
                currentRace.nextCutOff = f1info_service_1.default.checkCutOff(dateNow, firstMatch);
                res.status(200).send(currentRace);
            }
            else {
                res.status(500);
            }
        });
    }
}
exports.default = new F1InfoController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vY29udHJvbGxlcnMvZjFpbmZvLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFFQSxrREFBMEI7QUFFMUIseUVBQWdEO0FBSWhELGdGQUF1RDtBQUV2RCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUM1RCxNQUFNLGdCQUFnQjtJQUNsQjtRQUNJLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQ2hELE1BQU07SUFDVixDQUFDO0lBRUssU0FBUyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBRXZELE1BQU0sS0FBSyxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsTUFBTSxLQUFLLEdBQUcsTUFBTSxvQkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxNQUFNLFlBQVksR0FBVyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztZQUN4RyxNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLHVCQUF1QixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3JFLHFEQUFxRDtZQUNyRCxpS0FBaUs7WUFDakssSUFBSSxXQUFXLEdBQUc7Z0JBQ2QsOEZBQThGO2dCQUM5RixVQUFVLEVBQUUsRUFBRTtnQkFDZCxRQUFRLEVBQUUsRUFBVTthQUN2QixDQUFBO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUUzQixNQUFNLFlBQVksR0FBRyxNQUFNLG9CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEQsTUFBTSxVQUFVLEdBQUcsd0JBQWEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRXJFLElBQUcsVUFBVSxLQUFLLFNBQVMsRUFBQztnQkFDeEIsV0FBVyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7Z0JBQ2xDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsd0JBQWEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUV4RSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNyQztpQkFDRztnQkFDQSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO1FBQ0wsQ0FBQztLQUFBO0NBR0o7QUFFRCxrQkFBZSxJQUFJLGdCQUFnQixFQUFFLENBQUMifQ==