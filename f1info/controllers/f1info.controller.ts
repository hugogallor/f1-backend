import express from 'express';

import debug from 'debug';

import f1infoDao from '../../f1info/f1info.dao';

import { race } from '../f1info.dto';

import F1InfoService from '../services/f1info.service';
import f1infoService from '../services/f1info.service';
import * as f1scrape from '../services/F1scrape';

const log: debug.IDebugger = debug('app:f1info-controller');
class F1InfoController{
    constructor(){
        log('Created new instance of F1InfoController');
        //bind
    }

    async listTeams(req: express.Request, res: express.Response){
        
        const teams = await f1infoDao.getTeams();
        res.status(200).send(teams);
    }

    async listRaces(req: express.Request, res: express.Response){
        const races = await f1infoDao.getRaces();
        res.status(200).send(races);
    }

    async getRaceById(req: express.Request, res: express.Response){
        const raceIdNumber: number = parseInt(req.params.raceId); //se vale en ts? deberia esto ser un servicio?
        const race = await f1infoDao.getRace(raceIdNumber);
        res.status(200).send(race);
    }

    async generateCurrentRaceInfo(req: express.Request, res: express.Response){
        //cliente espera respuesta en objeto con este formato
        //crear objetos basados en interfaces https://stackoverflow.com/questions/13142635/how-can-i-create-an-object-based-on-an-interface-file-definition-in-typescript
        let currentRace = {
            //inCutOff: false, //no hace falta porque cliente se basa en nextCutOff para saber si bloquear
            nextCutOff: "",
            nextRace: {} as race,
        }
        const dateNow = new Date();
       
        const raceSchedule = await f1infoDao.getRaces();
        const firstMatch = F1InfoService.findNextRace(dateNow, raceSchedule);
        
        if(firstMatch !== undefined){
            currentRace.nextRace = firstMatch;
            currentRace.nextCutOff = F1InfoService.checkCutOff(dateNow, firstMatch);
            
            res.status(200).send(currentRace);
        }
        else{
            res.status(404).send();
        }
    }

    async patchRaceResults(req: express.Request, res: express.Response){
        //en los parametros del request viene el race id, se deben actualizar top 5, extra, bonus questions, y posiciones ganadas
        const raceIdNumber: number = parseInt(req.params.raceId); 
        
        const result = await f1infoDao.patchRaceTop5(raceIdNumber, req.body.userPicks);
        const resultQ = await f1infoDao.patchRaceQuestions(raceIdNumber, req.body.userQuestions);
        const resultPositions = await f1infoDao.patchPositionsGained(raceIdNumber, req.body.teams);
        //falta en algún lugar revisar si el usuario tiene penalización
        //ahora calcular resultados resultPositions tiene la carrera más actualizada
        if(resultPositions !== -1)  f1infoService.setUserResults(raceIdNumber, resultPositions);
        

    }

    async getPositionsGained(req: express.Request, res: express.Response){
     const positionsGained = await f1scrape.getPositionsGained(req.body.gridUrl, req.body.resultsUrl);
     res.status(200).send(positionsGained);
    }
}

export default new F1InfoController();