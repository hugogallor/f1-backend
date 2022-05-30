"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const f1info_service_2 = __importDefault(require("../services/f1info.service"));
const f1scrape = __importStar(require("../services/F1scrape"));
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
                res.status(404).send();
            }
        });
    }
    patchRaceResults(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //en los parametros del request viene el race id, se deben actualizar top 5, extra, bonus questions, y posiciones ganadas
            const raceIdNumber = parseInt(req.params.raceId);
            const result = yield f1info_dao_1.default.patchRaceTop5(raceIdNumber, req.body.userPicks);
            const resultQ = yield f1info_dao_1.default.patchRaceQuestions(raceIdNumber, req.body.userQuestions);
            const resultPositions = yield f1info_dao_1.default.patchPositionsGained(raceIdNumber, req.body.teams);
            //ahora calcular resultados resultPositions tiene la carrera más actualizada
            if (resultPositions !== -1)
                f1info_service_2.default.setUserResults(raceIdNumber, resultPositions);
        });
    }
    getPositionsGained(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const positionsGained = yield f1scrape.getPositionsGained(req.body.gridUrl, req.body.resultsUrl);
            res.status(200).send(positionsGained);
        });
    }
}
exports.default = new F1InfoController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vY29udHJvbGxlcnMvZjFpbmZvLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLGtEQUEwQjtBQUUxQix5RUFBZ0Q7QUFJaEQsZ0ZBQXVEO0FBQ3ZELGdGQUF1RDtBQUN2RCwrREFBaUQ7QUFFakQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDNUQsTUFBTSxnQkFBZ0I7SUFDbEI7UUFDSSxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUNoRCxNQUFNO0lBQ1YsQ0FBQztJQUVLLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUV2RCxNQUFNLEtBQUssR0FBRyxNQUFNLG9CQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztLQUFBO0lBRUssU0FBUyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3ZELE1BQU0sS0FBSyxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN6QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDekQsTUFBTSxZQUFZLEdBQVcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7WUFDeEcsTUFBTSxJQUFJLEdBQUcsTUFBTSxvQkFBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFSyx1QkFBdUIsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNyRSxxREFBcUQ7WUFDckQsaUtBQWlLO1lBQ2pLLElBQUksV0FBVyxHQUFHO2dCQUNkLDhGQUE4RjtnQkFDOUYsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLEVBQVU7YUFDdkIsQ0FBQTtZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFFM0IsTUFBTSxZQUFZLEdBQUcsTUFBTSxvQkFBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hELE1BQU0sVUFBVSxHQUFHLHdCQUFhLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztZQUVyRSxJQUFHLFVBQVUsS0FBSyxTQUFTLEVBQUM7Z0JBQ3hCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO2dCQUNsQyxXQUFXLENBQUMsVUFBVSxHQUFHLHdCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFeEUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDckM7aUJBQ0c7Z0JBQ0EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtRQUNMLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzlELHlIQUF5SDtZQUN6SCxNQUFNLFlBQVksR0FBVyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLG9CQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9FLE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RixNQUFNLGVBQWUsR0FBRyxNQUFNLG9CQUFTLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFM0YsNEVBQTRFO1lBQzVFLElBQUcsZUFBZSxLQUFLLENBQUMsQ0FBQztnQkFBRyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFHNUYsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkUsTUFBTSxlQUFlLEdBQUcsTUFBTSxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyJ9