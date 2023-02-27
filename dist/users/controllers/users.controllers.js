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
const users_dao_1 = __importDefault(require("../daos/users.dao"));
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
    setJokerChamp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield users_dao_1.default.updateJoker(req.body.id, req.body.jokerDriver);
            const result2 = yield users_dao_1.default.updateChampion(req.body.id, req.body.championDriver);
            res.status(200);
        });
    }
    getJoker(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.userId) {
                const result = yield users_dao_1.default.getJoker(req.query.userId.toString());
                res.status(200).send(result);
            }
            else {
                res.status(400);
            }
        });
    }
    getChamp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.query.userId) {
                const result = yield users_dao_1.default.getChampion(req.query.userId.toString());
                res.status(200).send(result);
            }
            else {
                res.status(400);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91c2Vycy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLDhFQUFxRDtBQUVyRCxvREFBNEI7QUFFNUIsa0RBQTBCO0FBRTFCLHlFQUFnRDtBQUVoRCw0REFBb0M7QUFDcEMsa0VBQXlDO0FBSXpDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzNELE1BQU0sZUFBZTtJQUNYLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUd2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLG9CQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFBQSxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3hELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLHVCQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFB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