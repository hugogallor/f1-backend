import express from 'express';

import usersService from '../services/users.service';

import argon2 from 'argon2';

import debug from 'debug';

import f1infoDao from '../../f1info/f1info.dao';

import nodemailer from 'nodemailer';
import usersDao from '../daos/users.dao';



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

    async setJokerChamp(req: express.Request, res:express.Response){
        const result = await usersDao.updateJoker(req.body.id, req.body.jokerDriver);
        const result2 = await usersDao.updateChampion(req.body.id, req.body.championDriver);
        res.status(200).send();
   }

   async getJoker(req: express.Request, res:express.Response){
        if(req.query.userId){
            const result = await usersDao.getJoker(req.query.userId.toString());
            res.status(200).send(result);
        }
        else{
            res.status(400);
        }
   }

   async getChamp(req: express.Request, res:express.Response){
    if(req.query.userId){
        const result = await usersDao.getChampion(req.query.userId.toString())
        res.status(200).send(result);
    }
    else{
        res.status(400);
    }
   }

    async sendResetEmail(req: express.Request, res: express.Response){
                // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "p3plzcpnl507357.prod.phx3.secureserver.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
            user: "f1picante@cartribute.com", // generated ethereal user
            pass: "bML)NQfSx1Jz", // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"F1Picante" <f1picante@cartribute.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "Reestablecer contraseña F1 Picante", // Subject line
            text: `Hola, usa la siguiente liga para reestablecer tu contraseña www.f1picante.cartribute.com/passwordreset/${req.body.hash}/${req.body.userId}`, // plain text body
            html: `<!DOCTYPE html>
                    <html>
                    <head>
                    <title>F1 Picante</title>
                    </head>
                    <body>
                    <b>F1 Picante</b>
                    <p>Hola, usa la siguiente liga para reestablecer tu contraseña</p><br>
                    <a href="www.f1picante.cartribute.com/passwordreset/${req.body.hash}/${req.body.userId}">Reestablecer contraseña</a><br>
                    Si la liga no funciona copia y pega este enlace en tu navegador:<br>
                    www.f1picante.cartribute.com/passwordreset/${req.body.hash}/${req.body.userId}
                    </body>
                    </html>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        res.status(200).send();
    }
}
  

export default new UsersController();