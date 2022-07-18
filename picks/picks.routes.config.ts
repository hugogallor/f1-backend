import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import { requestWhitelist } from "express-winston";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware"; //qué middleware necesitamos en los requests?
import { body } from 'express-validator';
import controllerPicks from "./controller/controller.picks";
//import picksController from "./picks.controller";

export class PicksRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app,'F1InfoRoutes');
    }

    configureRoutes(): express.Application{
        //picks de todos (si se implementan ligas hay que seleccionar id de liga)
        //se necesita una manera de esconder picks 
        /*
        this.app.route('/picks/')
            .put(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)           
            .delete(usersControllers.removeUser);
            */
            
        //picks de usuario (get y set) Agregar JST o auth eventualmente
        //
        this.app.route('/picks/:userId/')
            .put(controllerPicks.upload)
            .get(controllerPicks.getPicksByUserId)        
         /*   
         this.app.route('/picks/:userId/:raceId')
            .get(controllerPicks.getPicksByUserId)  */
        this.app.route('/standings')            
            .get(controllerPicks.getStandings)

        this.app.route('/standings/:raceId')            
            .get(controllerPicks.getRaceStandings)
        
        this.app.route('/picksRaces/:userId/')
            .get(controllerPicks.userRaces)  

        this.app.route('/picksCumulative')
            .get(controllerPicks.cumulativeBreakdown)  
        //results input
        /*
        this.app.route('/results/:raceId')
            .put(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)     
            */
            



        //Patch race with results
        /*
        this.app.patch('/users/:userId',[
            body('email').isEmail(),
                body('password').isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            usersMiddleware.validatePatchEmail,
            usersControllers.patch,
        ]);
        */

        return this.app;
    }
    

}
