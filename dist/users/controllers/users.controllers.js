"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const argon2_1 = __importDefault(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const f1info_dao_1 = __importDefault(require("../../f1info/f1info.dao"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const log = (0, debug_1.default)('app:users-controller');
class UsersController {
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const drivers = yield f1info_dao_1.default.getDrivers();
            ;
            res.status(200).send(drivers);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.body.id);
            res.status(200).send(user);
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const userId = yield users_service_1.default.create(req.body);
            res.status(201).send({ id: userId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.password) {
                req.body.password = yield argon2_1.default.hash(req.body.password);
            }
            log(yield users_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            log(yield users_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield users_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                userId: req.body.userId,
                name: req.body.name,
                permissionFlags: req.body.permissionFlags,
                authenticated: true,
                jokerDriver: req.body.joker,
            };
            res.status(200).send(user);
        });
    }
    sendResetEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer_1.default.createTransport({
                host: "a2plcpnl0833.prod.iad2.secureserver.net",
                port: 465,
                secure: true,
                auth: {
                    user: "f1picante@cartribute.com",
                    pass: "bML)NQfSx1Jz", // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
                from: '"F1Picante" <f1picante@cartribute.com>',
                to: req.body.email,
                subject: "Reestablecer contraseña F1 Picante",
                text: `Hola, usa la siguiente liga para reestablecer tu contraseña www.f1picante.cartribute.com/passwordreset/${req.body.hash}/${req.body.userId}`,
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
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91c2Vycy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLDhFQUFxRDtBQUVyRCxvREFBNEI7QUFFNUIsa0RBQTBCO0FBRTFCLHlFQUFnRDtBQUVoRCw0REFBb0M7QUFJcEMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQ1gsU0FBUyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBR3ZELE1BQU0sT0FBTyxHQUFHLE1BQU0sb0JBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUFBLENBQUM7WUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3pELE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxD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