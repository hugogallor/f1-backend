import express from 'express';
import debug from 'debug';
import PicksDao from '../picks.dao';
import { cutOffPenalty, emailPicks } from '../picks.services';
import UsersService from '../../users/services/users.service';

const log: debug.IDebugger = debug('app:picks-controller');
class PicksController{
    async upload(req: express.Request, res: express.Response){
        //hace falta middleware para checar que req.body sea igual a picks.dto ?
        //servicio para revisar si genera penalización por tiemop subido
        const penalty = cutOffPenalty(req.body);
        //enviadas ya empezada FP3 o qualy, no cuentan
        if(penalty === -1) return 
        req.body.penalty = penalty;
        const result = await PicksDao.uploadPicks(req.params.userId, req.body);
        const user = await UsersService.readById(req.params.userId);
        if(user == null){ res.status(404).send; return }
        emailPicks(user.email, req.body)
        res.status(200).send();
    }

    async getPicksByUserId(req: express.Request, res: express.Response){
       let picks = null;
        if(req.query.raceId){
            picks = await PicksDao.getUserPicksByRace(req.params.userId, req.query.raceId.toString());
        }
        else{
            picks = await PicksDao.getUserPicks(req.params.userId);
        }
        res.status(200).send(picks);
    }

   async getStandings(req: express.Request, res: express.Response){
        const standings = await PicksDao.aggregateStandings();
        res.status(200).send(standings);
   }

   async getRaceStandings(req: express.Request, res: express.Response){
    const standings = await PicksDao.raceStandings(req.params.raceId);
    res.status(200).send(standings);
}

   async userRaces(req: express.Request, res: express.Response){
        const userRaces = await PicksDao.racesBreakdown(req.params.userId);
        res.status(200).send(userRaces);

   }

   async cumulativeBreakdown(req: express.Request, res:express.Response){
    const cumulative = await PicksDao.cumulativePoints();
    res.status(200).send(cumulative);
   }

}

export default new PicksController();