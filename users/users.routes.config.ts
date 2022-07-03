import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import { requestWhitelist } from "express-winston";
import usersControllers from "./controllers/users.controllers";
import usersMiddleware from "./middleware/users.middleware";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from 'express-validator';
import usersService from "./services/users.service";

export class UsersRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app,'UsersRoutes');
    }

    configureRoutes(): express.Application{
        this.app.route('/users')
            .get(usersControllers.listUsers)
            .post(
                body('email').isEmail(),
                body('password').isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                usersMiddleware.validateSameEmailDoesntExist,
                usersControllers.createUser
            );
        
        this.app.param('userId', usersMiddleware.extractUserID);
        this.app.route('/users/:userId')
            .all(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)           
            .delete(usersControllers.removeUser);

        this.app.put('/users/:userId',[
            body('email').isEmail(),
                body('password').isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            usersMiddleware.validateSameEmailBelongToSameUser,
            usersControllers.put,

        ]);

        this.app.patch('/users/:userId',[
            body('email').isEmail(),
                body('password').isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
            usersMiddleware.validatePatchEmail,
            usersMiddleware.validatePatchHash,
            usersControllers.patch,
        ]);

    

        this.app.post('/login',
        body('email').isEmail(),
        body('password').isString(),
        //usersMiddleware.hashBodyPassword,
        usersMiddleware.authenticateUser,
        usersControllers.login)

        //usuario quiere resetear contraseña, 
        //verificar que existe, crear hash, enviar mail, avisar a usuario
        this.app.post('/user/reset', 
        body('email').isEmail(),
        usersMiddleware.setResetHash,
        usersControllers.sendResetEmail

        )

        return this.app;
    }
    

}
