import express from 'express';
import debug from 'debug';
import PicksDao from '../picks.dao';

const log: debug.IDebugger = debug('app:picks-controller');
class PicksController{
    async upload(req: express.Request, res: express.Response){
        //hace falta middleware para checar que req.body sea igual a picks.dto ?
        const result = await PicksDao.uploadPicks(req.params.userId, req.body);
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

   

}

export default new PicksController();