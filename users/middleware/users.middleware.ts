import express from 'express';
import usersService from '../services/users.service';
import debug from 'debug';
import * as argon2 from 'argon2';
import usersDao from '../daos/users.dao';
import {randomBytes} from 'node:crypto';

const log: debug.IDebugger = debug('app:users-controller');
class UsersMiddleware{

    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ){
        const user = await usersService.getUserByEmail(req.body.email);
        if ( user){
            res.status(400).send({error: 'User email already exists'});
        } else {
            next();
        }
    }

    async validateSameEmailBelongToSameUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ){
        const user = await usersService.getUserByEmail(req.body.email);
        log('user params',req.params.userId);
        if (user && user.id === req.params.userId){
            next();
        } else {
            res.status(400).send({error: 'Invalid email'});
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        if(req.body.email){
            console.log('Validating email', req.body.email);
            this.validateSameEmailBelongToSameUser(req, res, next);
        } else{
            next();
        }
    }

    validatePatchHash = async(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        if(req.body.hash){
            const userHash = await usersDao.getResetHash(req.body.userId);
            console.log("got user hash ", userHash);
            if(userHash !== undefined && userHash != null){
                if (userHash.resetHash === req.body.hash){
                    next();
                }
                else{
                    //res.status(401).send();
                }
            }
            //res.status(401).send();
        }
    }

    async validateUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ){
        const user = await usersService.readById(req.params.userId);
        if(user){
            next();
        } else {
            res.status(404).send({
                error: `User ${req.params.userId} not found`,
            });
        }
    }

    async extractUserID(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ){
        req.body.id = req.params.userId;
        next();
    }

    async authenticateUser(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction){

        const user: any = await usersService.getUserByEmailWithPassword(req.body.email);
        if(user){
            const passwordHash = user.password;
            if(await argon2.verify(passwordHash,req.body.password)){
                req.body.userId = user._id;
                req.body.permissionFlags = user.permissionFlags;
                req.body.email = user.email;
                req.body.name = user.firstName +" " +  user.lastName;
                req.body.joker = user.jokerDriver;

               
                req.session.userId = user._id;
				req.session.userName = user.email;
                req.session.authenticated = true;
                return next();

            }

        }    
        // Giving the same message in both cases
        // helps protect against cracking attempts:
        res.status(400).send({ errors: ['Invalid email and/or password'] });
        

    }

    
    async hashBodyPassword(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ){
        req.body.password = await argon2.hash(req.body.password);
        return next();
    }

    async setResetHash(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ){
        const buffer = randomBytes(10)
        const hash = await argon2.hash(buffer.toString('hex'),{raw:true, hashLength:16});
        const result = await usersDao.setResetHash(req.body.email, hash.toString('hex') );
        if(result === -1 || result  == null ){
            res.status(400).send({ errors: ['Invalid email and/or password'] });
            return;
        }        
        req.body.hash = hash.toString('hex');
        req.body.userId = result._id.toString();
        return next();
    }
}

export default new UsersMiddleware();