import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import session from 'express-session';
import cors from 'cors';
import {CommonRoutesConfig} from './common/common.routes.config';
import cookieParser from 'cookie-parser';
import {UsersRoutes} from './users/users.routes.config';
import { F1InfoRoutes } from './f1info/f1info.routes.config';
import {serverPort} from './config';
import debug from 'debug';
import { ExpressWinstonRequest } from 'express-winston';

import { AuthRoutes } from './auth/auth.routes.config';
import { PicksRoutes } from './picks/picks.routes.config';



//declare the variables that we want to use
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = serverPort;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

//here we are adding middleware to parse all incoming requests as JSON
app.use(express.json());

//here we are adding middleware to allow corss-origin requests
app.use(cors());

//here we are preparing the expressWinston logging middleweare configuration,
//which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({all: true})
    ),
};

if(!process.env.DEBUG){
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

//init the logger
app.use(expressWinston.logger(loggerOptions));

//Los @types de express session no nos dejan meter datos propios a menos que lo extendamos
//https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748513261
declare module 'express-session' {
    interface Session {
       userId: string;
       userName: string;
       authenticated: boolean;
     }
   }
//Session para autenticar usuarios y demás https://codeshack.io/basic-login-system-nodejs-express-mysql/
app.use(session({
	secret: 'AsumoQueE$todaSEguridad?',   //creo que esto se tiene que sacar del codigo a .env
	resave: false,
	saveUninitialized: true
}));
// cookie parser middleware
app.use(cookieParser());

//here we are adding the UserRoutes to our array, after sending the Express.js application
//objtect to have thre routes added to our app!
routes.push(new UsersRoutes(app));
routes.push(new F1InfoRoutes(app)); //por ahora no usaremos auth para el primer deployment
routes.push(new PicksRoutes(app));
//this is a simple route to make sure everything is working
const runningMessage = `Server running at http://localhost:${port}`;

app.route('/')
    .get((req, res) => res.status(200).send("Hola :)"));

server.listen(port, ()=> {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);

    });

    console.log(runningMessage);
});
