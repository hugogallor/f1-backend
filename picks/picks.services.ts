import { userPicks } from "./picks.dto";
import F1InfoService from "../f1info/services/f1info.service";

export function cutOffPenalty(picksData: userPicks) {
    const dateNow = new Date();
    console.log("race to check", picksData.race)
    //convertir a fecha?
    picksData.race.schedule.FP1 = new Date(picksData.race.schedule.FP1);
    picksData.race.schedule.FP2 = new Date(picksData.race.schedule.FP2);
    picksData.race.schedule.FP3 = new Date(picksData.race.schedule.FP3);
    picksData.race.schedule.Qualy = new Date(picksData.race.schedule.Qualy);
    picksData.race.schedule.Race = new Date(picksData.race.schedule.Race);
    const nextCutOff = F1InfoService.checkCutOff(dateNow, picksData.race);
    console.log("Check penalty", dateNow);
    console.log("Check penalty", picksData.race.schedule.FP1);
    
    //Next cutoff nos dice que estamos en la sesión de antes
    switch(nextCutOff){
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