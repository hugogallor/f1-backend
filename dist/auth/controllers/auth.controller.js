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
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const log = (0, debug_1.default)('app:auth-controller');
/**
* This value is automatically populated from .env, a file which you will have
* to create for yourself at the root of the project.
*
* See .env.example in the repo for the required format.
*/
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
log('jwtSecret', jwtSecret);
const tokenExpirationInSeconds = 36000;
class AuthController {
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshId = req.body.userId + jwtSecret;
                const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
                const hash = crypto_1.default
                    .createHmac('sha512', salt)
                    .update(refreshId)
                    .digest('base64');
                req.body.refreshKey = salt.export();
                const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, {
                    expiresIn: tokenExpirationInSeconds,
                });
                return res.status(201).send({ accessToken: token, refreshToken: hash });
            }
            catch (err) {
                log('createJWT error: %0', err);
                return res.status(500).send();
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXV0aC9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsZ0VBQStCO0FBQy9CLG9EQUE0QjtBQUc1QixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUxRDs7Ozs7RUFLRTtBQUNGLG1CQUFtQjtBQUNuQixNQUFNLFNBQVMsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztBQUNqRCxHQUFHLENBQUMsV0FBVyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBRXZDLE1BQU0sY0FBYztJQUNWLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN2RCxJQUFHO2dCQUNDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDOUMsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsZ0JBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxJQUFJLEdBQUcsZ0JBQU07cUJBQ2QsVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7cUJBQzFCLE1BQU0sQ0FBQyxTQUFTLENBQUM7cUJBQ2pCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNwQyxNQUFNLEtBQUssR0FBRyxzQkFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtvQkFDeEMsU0FBUyxFQUFFLHdCQUF3QjtpQkFDdEMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQ3pFO1lBQUMsT0FBTyxHQUFHLEVBQUM7Z0JBQ1QsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDakM7UUFDTCxDQUFDO0tBQUE7Q0FHSjtBQUNELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMifQ==