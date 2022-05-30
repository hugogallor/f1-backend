import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import { requestWhitelist } from "express-winston";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware"; //qué middleware necesitamos en los requests?
import { body } from 'express-validator';
import f1infoController from "./controllers/f1info.controller";

export class F1InfoRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app,'F1InfoRoutes');
    }

    configureRoutes(): express.Application{
        //get all teams
        this.app.route('/teams')
            .get(f1infoController.listTeams);
        
       //get race calendar
       
        this.app.route('/races')
                .get(f1infoController.listRaces);

        //get specific race
        //param to indicate next race
        //agregar middleware de patch para checar que no haya "selecciona"?
        this.app.route('/races/:raceId')
                .get(f1infoController.getRaceById)
                .patch(f1infoController.patchRaceResults);
                
      

        this.app.route('/current')
                .get(f1infoController.generateCurrentRaceInfo)

        this.app.route('/gained')
                .post(f1infoController.getPositionsGained)



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
