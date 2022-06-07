"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutOffPenalty = void 0;
const f1info_service_1 = __importDefault(require("../f1info/services/f1info.service"));
function cutOffPenalty(picksData) {
    const dateNow = new Date();
    console.log("race to check", picksData.race);
    //convertir a fecha?
    picksData.race.schedule.FP1 = new Date(picksData.race.schedule.FP1);
    picksData.race.schedule.FP2 = new Date(picksData.race.schedule.FP2);
    picksData.race.schedule.FP3 = new Date(picksData.race.schedule.FP3);
    picksData.race.schedule.Qualy = new Date(picksData.race.schedule.Qualy);
    picksData.race.schedule.Race = new Date(picksData.race.schedule.Race);
    const nextCutOff = f1info_service_1.default.checkCutOff(dateNow, picksData.race);
    console.log("Check penalty", dateNow);
    console.log("Check penalty", picksData.race.schedule.FP1);
    //Next cutoff nos dice que estamos en la sesión de antes
    switch (nextCutOff) {
        case "FP1":
            return 0;
        case "FP2":
            return -30;
        case "FP3":
            return -60;
        case "Qualy":
            return -1;
        case "Race":
            return -1;
    }
    return 0;
}
exports.cutOffPenalty = cutOffPenalty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Muc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9waWNrcy9waWNrcy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx1RkFBOEQ7QUFFOUQsU0FBZ0IsYUFBYSxDQUFDLFNBQW9CO0lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVDLG9CQUFvQjtJQUNwQixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sVUFBVSxHQUFHLHdCQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUQsd0RBQXdEO0lBQ3hELFFBQU8sVUFBVSxFQUFDO1FBQ2QsS0FBSyxLQUFLO1lBQ04sT0FBTyxDQUFDLENBQUM7UUFDYixLQUFLLEtBQUs7WUFDTixPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ2YsS0FBSyxLQUFLO1lBQ04sT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNmLEtBQUssT0FBTztZQUNSLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxLQUFLLE1BQU07WUFDUCxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBRWpCO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFFYixDQUFDO0FBN0JELHNDQTZCQyJ9