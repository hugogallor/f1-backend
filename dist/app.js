"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const users_routes_config_1 = require("./users/users.routes.config");
const f1info_routes_config_1 = require("./f1info/f1info.routes.config");
const config_1 = require("./config");
const debug_1 = __importDefault(require("debug"));
const picks_routes_config_1 = require("./picks/picks.routes.config");
//declare the variables that we want to use
const app = (0, express_1.default)();
const server = http.createServer(app);
const port = config_1.serverPort;
const routes = [];
const debugLog = (0, debug_1.default)('app');
//here we are adding middleware to parse all incoming requests as JSON
app.use(express_1.default.json());
//here we are adding middleware to allow corss-origin requests
app.use((0, cors_1.default)());
//here we are preparing the expressWinston logging middleweare configuration,
//which will automatically log all HTTP requests handled by Express.js
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}
//init the logger
app.use(expressWinston.logger(loggerOptions));
//Session para autenticar usuarios y demás https://codeshack.io/basic-login-system-nodejs-express-mysql/
app.use((0, express_session_1.default)({
    secret: 'AsumoQueE$todaSEguridad?', //creo que esto se tiene que sacar del codigo a .env
    resave: false,
    saveUninitialized: true
}));
// cookie parser middleware
app.use((0, cookie_parser_1.default)());
//here we are adding the UserRoutes to our array, after sending the Express.js application
//objtect to have thre routes added to our app!
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new f1info_routes_config_1.F1InfoRoutes(app)); //por ahora no usaremos auth para el primer deployment
routes.push(new picks_routes_config_1.PicksRoutes(app));
//this is a simple route to make sure everything is working
const runningMessage = `Server running at http://localhost:${port}`;
app.route('/')
    .get((req, res) => res.status(200).send("Hola :)"));
server.listen(port, () => {
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMkNBQTZCO0FBRTdCLGlEQUFtQztBQUNuQyxnRUFBa0Q7QUFDbEQsc0VBQXNDO0FBQ3RDLGdEQUF3QjtBQUV4QixrRUFBeUM7QUFDekMscUVBQXdEO0FBQ3hELHdFQUE2RDtBQUM3RCxxQ0FBb0M7QUFDcEMsa0RBQTBCO0FBSTFCLHFFQUEwRDtBQUkxRCwyQ0FBMkM7QUFDM0MsTUFBTSxHQUFHLEdBQXdCLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQzNDLE1BQU0sTUFBTSxHQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sSUFBSSxHQUFHLG1CQUFVLENBQUM7QUFDeEIsTUFBTSxNQUFNLEdBQThCLEVBQUUsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBb0IsSUFBQSxlQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFFL0Msc0VBQXNFO0FBQ3RFLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLDhEQUE4RDtBQUM5RCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsY0FBSSxHQUFFLENBQUMsQ0FBQztBQUVoQiw2RUFBNkU7QUFDN0Usc0VBQXNFO0FBQ3RFLE1BQU0sYUFBYSxHQUFpQztJQUNoRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUMxQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUN2QztDQUNKLENBQUM7QUFFRixJQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUNuQixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLGlEQUFpRDtBQUNqRixDQUFDO0FBRUQsaUJBQWlCO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBVzlDLHdHQUF3RztBQUN4RyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEseUJBQU8sRUFBQztJQUNmLE1BQU0sRUFBRSwwQkFBMEIsRUFBSSxvREFBb0Q7SUFDMUYsTUFBTSxFQUFFLEtBQUs7SUFDYixpQkFBaUIsRUFBRSxJQUFJO0NBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0osMkJBQTJCO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztBQUV4QiwwRkFBMEY7QUFDMUYsK0NBQStDO0FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxpQ0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLG1DQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLHNEQUFzRDtBQUMxRixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUNBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLDJEQUEyRDtBQUMzRCxNQUFNLGNBQWMsR0FBRyxzQ0FBc0MsSUFBSSxFQUFFLENBQUM7QUFFcEUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBRXhELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUUsRUFBRTtJQUNwQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBeUIsRUFBRSxFQUFFO1FBQ3pDLFFBQVEsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUV6RCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMifQ==