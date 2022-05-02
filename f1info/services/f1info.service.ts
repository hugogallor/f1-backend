import express from 'express';

import debug from 'debug';

import f1infoDao from '../../f1info/f1info.dao';

import { race } from '../f1info.dto';

const log: debug.IDebugger = debug('app: f1info service');
 class  F1InfoService{

    checkCutOff(now: Date, raceSchedule: race){
        let nextCutOff = "FP1";
        log('now',now.toISOString());
        log('fp2', raceSchedule.schedule.FP2.toISOString());

        log('now',now.toLocaleDateString());
        log('fp2', raceSchedule.schedule.FP2.toLocaleDateString());

        log('now',now.toUTCString());
        log('fp2', raceSchedule.schedule.FP2.toUTCString());
        if(now.toISOString() > raceSchedule.schedule.FP1.toISOString()) nextCutOff = "FP2";
        if(now.toISOString() > raceSchedule.schedule.FP2.toISOString()) nextCutOff = "FP3";
        if(now.toISOString() > raceSchedule.schedule.FP3.toISOString()) nextCutOff = "Qualy";
        if(now.toISOString() > raceSchedule.schedule.Qualy.toISOString()) nextCutOff = "Race";
        return nextCutOff;
    }

    findNextRace(now: Date, races: race[]){
        return races.find(( race ) => now.toISOString() < race.schedule.Race.toISOString())
    }
}

export default new F1InfoService();