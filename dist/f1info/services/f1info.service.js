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
const users_dao_1 = __importDefault(require("../../users/daos/users.dao"));
const picks_dao_1 = __importDefault(require("../../picks/picks.dao"));
const picks_points_1 = require("../../picks/picks.points");
//import { picksSchema } from '../../picks/picks.schema';
const log = (0, debug_1.default)('app: f1info service');
class F1InfoService {
    checkCutOff(now, raceSchedule) {
        let nextCutOff = "FP1";
        log('now', now.toISOString());
        log('fp2', raceSchedule.schedule.FP2.toISOString());
        log('now', now.toLocaleDateString());
        log('fp2', raceSchedule.schedule.FP2.toLocaleDateString());
        log('now', now.toUTCString());
        log('fp2', raceSchedule.schedule.FP2.toUTCString());
        if (now.toISOString() > raceSchedule.schedule.FP1.toISOString())
            nextCutOff = "FP2";
        if (now.toISOString() > raceSchedule.schedule.FP2.toISOString())
            nextCutOff = "FP3";
        if (now.toISOString() > raceSchedule.schedule.FP3.toISOString())
            nextCutOff = "Qualy";
        if (now.toISOString() > raceSchedule.schedule.Qualy.toISOString())
            nextCutOff = "Race";
        return nextCutOff;
    }
    findNextRace(now, races) {
        return races.find((race) => now.toISOString() < race.schedule.Race.toISOString());
    }
    setUserResults(raceId, raceResults) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            //get users
            const users = yield users_dao_1.default.getUsers();
            // console.log(users);
            for (const user of users) {
                const queryResult = yield picks_dao_1.default.getUserPicksByRace(user._id, raceId.toString());
                if (queryResult !== -1 && queryResult) {
                    const userPicks = queryResult;
                    let userPoints = 0;
                    //top5
                    userPicks.race.results.forEach((userDriver, i) => {
                        if (userDriver.number === raceResults.results[i].number) {
                            userDriver.points = picks_points_1.points.top5[i];
                            userPoints += picks_points_1.points.top5[i];
                        }
                        else {
                            userDriver.points = 0;
                        }
                    });
                    //topTeam
                    if (userPicks.race.topTeam.name === raceResults.topTeam.name) {
                        userPicks.race.topTeam.points = picks_points_1.points.topTeam;
                        userPoints += picks_points_1.points.topTeam;
                    }
                    else {
                        userPicks.race.topTeam.points = 0;
                    }
                    //extra
                    if (userPicks.race.fastestLap.number === raceResults.fastestLap.number) {
                        userPicks.race.fastestLap.points = picks_points_1.points.fastestLap;
                        userPoints += picks_points_1.points.fastestLap;
                    }
                    else {
                        userPicks.race.fastestLap.points = 0;
                    }
                    //hay gente que no metió piloto para firstRet
                    //para calculo de primera carrera, usar apellido del piloto. Cambiar después por si hay pilotos con mismo apellido?
                    if ((_a = raceResults.dnfResults) === null || _a === void 0 ? void 0 : _a.some((dnfDriver) => dnfDriver.lastName === userPicks.race.firstRetirement.lastName)) {
                        console.log("dnf Result:" + raceResults.dnfResults);
                        console.log("dnf user:" + userPicks.race.firstRetirement);
                        userPicks.race.firstRetirement.points = picks_points_1.points.firstRetirement;
                        userPoints += picks_points_1.points.firstRetirement;
                    }
                    else {
                        userPicks.race.firstRetirement.points = 0;
                    }
                    if (userPicks.race.pole.number === raceResults.pole.number) {
                        userPicks.race.pole.points = picks_points_1.points.pole;
                        userPoints += picks_points_1.points.pole;
                    }
                    else {
                        userPicks.race.pole.points = 0;
                    }
                    if (userPicks.race.lastPlace.number === raceResults.lastPlace.number) {
                        userPicks.race.lastPlace.points = picks_points_1.points.lastPlace;
                        userPoints += picks_points_1.points.lastPlace;
                    }
                    else {
                        userPicks.race.lastPlace.points = 0;
                    }
                    //bonus 
                    userPicks.race.bonus.forEach((question, i) => {
                        if (question.R === raceResults.bonus[i].R) {
                            question.points = picks_points_1.points.bonusQuestion;
                            userPoints += picks_points_1.points.bonusQuestion;
                        }
                        else {
                            question.points = 0;
                        }
                    });
                    //joker
                    const joker = userPicks.jokerDriver;
                    const resultsTeam = raceResults.team_rosters.find((team) => team.drivers.some((driver) => driver.number === joker.number));
                    if (resultsTeam) {
                        // console.log("your joker's team is: ", resultsTeam);
                        const resultsDriver = resultsTeam.drivers.find((driver) => driver.number === joker.number);
                        if (resultsDriver) {
                            //   console.log("your joker gained: ", resultsDriver.positionsGained);
                            if (resultsDriver.positionsGained !== undefined) {
                                if (resultsDriver.positionsGained > 0) {
                                    userPicks.jokerDriver.points = picks_points_1.points.joker * resultsDriver.positionsGained;
                                    userPoints += picks_points_1.points.joker * resultsDriver.positionsGained;
                                }
                                else {
                                    userPicks.jokerDriver.points = 0;
                                }
                            }
                            else {
                                userPicks.jokerDriver.points = 0;
                            }
                        }
                    }
                    //raceJoker
                    const raceJoker = userPicks.race.raceJoker;
                    if (raceJoker.firstName == "Selecciona") {
                        userPicks.race.raceJoker.points = 0;
                        console.log("raceJoker Selecciona ", resultsTeam);
                    }
                    else {
                        const resultsTeamRJ = raceResults.team_rosters.find((team) => team.drivers.some((driver) => driver.number === raceJoker.number));
                        if (resultsTeamRJ) {
                            // console.log("your joker's team is: ", resultsTeam);
                            const resultsDriver = resultsTeamRJ.drivers.find((driver) => driver.number === raceJoker.number);
                            if (resultsDriver) {
                                //   console.log("your joker gained: ", resultsDriver.positionsGained);
                                if (resultsDriver.positionsGained !== undefined) {
                                    //no nos importa si son negativos o no                            
                                    userPicks.race.raceJoker.points = picks_points_1.points.joker * resultsDriver.positionsGained;
                                    userPoints += picks_points_1.points.joker * resultsDriver.positionsGained;
                                }
                                else {
                                    userPicks.race.raceJoker.points = 0;
                                }
                            }
                        }
                        else {
                            //Si dejaron As en blanco. Asignar 0 puntos
                            userPicks.race.raceJoker.points = 0;
                        }
                    }
                    //log("user Penalty" , userPicks.penalty)
                    userPoints += userPicks.penalty;
                    userPicks.userPoints = userPoints;
                    const saveResult = yield userPicks.save();
                    console.log("saveResult", saveResult);
                }
            }
        });
    }
}
exports.default = new F1InfoService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvZjFpbmZvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFHMUIsMkVBQWtEO0FBQ2xELHNFQUE2QztBQUc3QywyREFBa0Q7QUFDbEQseURBQXlEO0FBRXpELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3pELE1BQU8sYUFBYTtJQUVqQixXQUFXLENBQUMsR0FBUyxFQUFFLFlBQWtCO1FBQ3JDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN2QixHQUFHLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUVwRCxHQUFHLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFDcEMsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7UUFFM0QsR0FBRyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM3QixHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDcEQsSUFBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuRixJQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsUUFBUSxD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