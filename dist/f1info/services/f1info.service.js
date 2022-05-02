"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
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
}
exports.default = new F1InfoService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvZjFpbmZvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxrREFBMEI7QUFNMUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDekQsTUFBTyxhQUFhO0lBRWpCLFdBQVcsQ0FBQyxHQUFTLEVBQUUsWUFBa0I7UUFDckMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDN0IsR0FBRyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBELEdBQUcsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUNwQyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQztRQUUzRCxHQUFHLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7WUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25GLElBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtZQUFFLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkYsSUFBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFO1lBQUUsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUNyRixJQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFBRSxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3RGLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBUyxFQUFFLEtBQWE7UUFDakMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUUsSUFBSSxFQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQTtJQUN2RixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=