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
            res.status(200).send();
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
                host: "p3plzcpnl507357.prod.phx3.secureserver.net",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "f1picante@cartribute.com", // generated ethereal user
                    pass: "bML)NQfSx1Jz", // generated ethereal password
                },
            });
            // send mail with defined transport object
            let info = yield transporter.sendMail({
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
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi91c2Vycy9jb250cm9sbGVycy91c2Vycy5jb250cm9sbGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVBLDhFQUFxRDtBQUVyRCxvREFBNEI7QUFFNUIsa0RBQTBCO0FBRTFCLHlFQUFnRDtBQUVoRCw0REFBb0M7QUFDcEMsa0VBQXlDO0FBSXpDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzNELE1BQU0sZUFBZTtJQUNYLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUd2RCxNQUFNLE9BQU8sR0FBRyxNQUFNLG9CQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7WUFBQSxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3hELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLHVCQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNuRCxJQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUM7Z0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sZ0JBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQ0QsR0FBRyxDQUFDLE1BQU0sdUJBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDakQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLHVCQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3hELEdBQUcsQ0FBQyxNQUFNLHVCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVLLEtBQUssQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNuRCxNQUFNLElBQUksR0FBRztnQkFDVCxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUN2QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNuQixlQUFlLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlO2dCQUN6QyxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSzthQUM5QixDQUFDO1lBR0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0IsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBb0I7O1lBQzFELE1BQU0sTUFBTSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3RSxNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDcEYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsR0FBb0IsRUFBRSxHQUFvQjs7WUFDcEQsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ3BFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7aUJBQ0csQ0FBQztnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDTixDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsR0FBb0IsRUFBRSxHQUFvQjs7WUFDeEQsSUFBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLG1CQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ3RFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7aUJBQ0csQ0FBQztnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDRixDQUFDO0tBQUE7SUFFTSxjQUFjLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEQsc0VBQXNFO1lBQzlFLElBQUksV0FBVyxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUFDO2dCQUN6QyxJQUFJLEVBQUUsNENBQTRDO2dCQUNsRCxJQUFJLEVBQUUsR0FBRztnQkFDVCxNQUFNLEVBQUUsSUFBSSxFQUFFLHNDQUFzQztnQkFDcEQsSUFBSSxFQUFFO29CQUNOLElBQUksRUFBRSwwQkFBMEIsRUFBRSwwQkFBMEI7b0JBQzVELElBQUksRUFBRSxjQUFjLEVBQUUsOEJBQThCO2lCQUNuRDthQUNKLENBQUMsQ0FBQztZQUVILDBDQUEwQztZQUMxQyxJQUFJLElBQUksR0FBRyxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQ2xDLElBQUksRUFBRSx3Q0FBd0MsRUFBRSxpQkFBaUI7Z0JBQ2pFLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxvQkFBb0I7Z0JBQ3hDLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxlQUFlO2dCQUM5RCxJQUFJLEVBQUUsMEdBQTBHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsa0JBQWtCO2dCQUN0SyxJQUFJLEVBQUU7Ozs7Ozs7OzBFQVF3RCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07O2lFQUV6QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07OzRCQUVyRSxFQUFFLFlBQVk7YUFDakMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsbUVBQW1FO1lBRW5FLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQztLQUFBO0NBQ0o7QUFHRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=