import {driver, team, bonusQuestion, race} from '../f1info/f1info.dto';

export interface userPicks {
    userId: string,
    race: race,
    userPoints: number,
    jokerDriver: driver
    
    }

