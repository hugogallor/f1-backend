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
const debug_1 = __importDefault(require("debug"));
const argon2 = __importStar(require("argon2"));
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    constructor() {
        // Here we need to use an arrow function to bind `this` correctly
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                console.log('Validating email', req.body.email);
                this.validateSameEmailBelongToSameUser(req, res, next);
            }
            else {
                next();
            }
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(req.body.email);
            if (user) {
                res.status(400).send({ error: 'User email already exists' });
            }
            else {
                next();
            }
        });
    }
    validateSameEmailBelongToSameUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmail(req.body.email);
            log('user params', req.params.userId);
            if (user && user.id === req.params.userId) {
                next();
            }
            else {
                res.status(400).send({ error: 'Invalid email' });
            }
        });
    }
    validateUserExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.readById(req.params.userId);
            if (user) {
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.params.userId} not found`,
                });
            }
        });
    }
    extractUserID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
    }
    authenticateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmailWithPassword(req.body.email);
            if (user) {
                const passwordHash = user.password;
                if (yield argon2.verify(passwordHash, req.body.password)) {
                    req.body.userId = user._id;
                    req.body.permissionFlags = user.permissionFlags;
                    req.body.email = user.email;
                    req.body.name = user.firstName + " " + user.lastName;
                    req.body.joker = user.jokerDriver;
                    req.session.userId = user._id;
                    req.session.userName = user.email;
                    req.session.authenticated = true;
                    return next();
                }
            }
            // Giving the same message in both cases
            // helps protect against cracking attempts:
            res.status(400).send({ errors: ['Invalid email and/or password'] });
        });
    }
    hashBodyPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2.hash(req.body.password);
            return next();
        });
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21pZGRsZXdhcmUvdXNlcnMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOEVBQXFEO0FBQ3JELGtEQUEwQjtBQUMxQiwrQ0FBaUM7QUFFakMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDM0QsTUFBTSxlQUFlO0lBQXJCO1FBNkJJLGlFQUFpRTtRQUNqRSx1QkFBa0IsR0FBRyxDQUNqQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQixFQUM1QixFQUFFO1lBQ0EsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQztnQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFEO2lCQUFLO2dCQUNGLElBQUksRUFBRSxDQUFDO2FBQ1Y7UUFDTCxDQUFDLENBQUEsQ0FBQTtJQWtFTCxDQUFDO0lBekdTLDRCQUE0QixDQUM5QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUssSUFBSSxFQUFDO2dCQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLDJCQUEyQixFQUFDLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFDSCxJQUFJLEVBQUUsQ0FBQzthQUNWO1FBQ0ws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