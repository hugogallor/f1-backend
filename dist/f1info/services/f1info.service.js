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
            //get users
            const users = yield users_dao_1.default.getUsers();
            console.log(users);
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
                    //extra
                    if (userPicks.race.fastestLap.number === raceResults.fastestLap.number) {
                        userPicks.race.fastestLap.points = picks_points_1.points.fastestLap;
                        userPoints += picks_points_1.points.fastestLap;
                    }
                    else {
                        userPicks.race.fastestLap.points = 0;
                    }
                    if (userPicks.race.firstRetirement.number === raceResults.firstRetirement.number) {
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
                            if (resultsDriver.positionsGained) {
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