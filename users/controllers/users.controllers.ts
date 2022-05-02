import express from 'express';

import usersService from '../services/users.service';

import argon2 from 'argon2';

import debug from 'debug';

import f1infoDao from '../../f1info/f1info.dao';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController{
    async listUsers(req: express.Request, res: express.Response){
        

        const drivers = await f1infoDao.getDrivers();;
        res.status(200).send(drivers);
    }

    async getUserById(req: express.Request, res: express.Response){
        const user = await usersService.readById(req.body.id);
        res.status(200).send(user);

    }

    async createUser(req: express.Request, res: express.Response){
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);
        res.status(201).send({id: userId});
    }

    async patch(req: express.Request, res: express.Response){
        if(req.body.password){
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response){
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeUser(req: express.Request, res: express.Response){
        log(await usersService.deleteById(req.body.id));
        res.status(204).send();
    }

    async login(req: express.Request, res: express.Response){
        const user = {
            userId: req.body.userId,
            name: req.body.name,
            permissionFlags: req.body.permissionFlags,
            authenticated: true,
            jokerDriver: req.body.joker,
        };
        
       
        res.status(200).send(user);

    }

  

}

export default new UsersController();