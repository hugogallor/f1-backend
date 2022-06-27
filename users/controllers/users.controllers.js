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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var users_service_1 = require("../services/users.service");
var argon2_1 = require("argon2");
var debug_1 = require("debug");
var f1info_dao_1 = require("../../f1info/f1info.dao");
var nodemailer_1 = require("nodemailer");
var log = (0, debug_1["default"])('app:users-controller');
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.listUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var drivers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, f1info_dao_1["default"].getDrivers()];
                    case 1:
                        drivers = _a.sent();
                        ;
                        res.status(200).send(drivers);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, users_service_1["default"].readById(req.body.id)];
                    case 1:
                        user = _a.sent();
                        res.status(200).send(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body;
                        return [4 /*yield*/, argon2_1["default"].hash(req.body.password)];
                    case 1:
                        _a.password = _b.sent();
                        return [4 /*yield*/, users_service_1["default"].create(req.body)];
                    case 2:
                        userId = _b.sent();
                        res.status(201).send({ id: userId });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.patch = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req.body.password) return [3 /*break*/, 2];
                        _a = req.body;
                        return [4 /*yield*/, argon2_1["default"].hash(req.body.password)];
                    case 1:
                        _a.password = _c.sent();
                        _c.label = 2;
                    case 2:
                        _b = log;
                        return [4 /*yield*/, users_service_1["default"].patchById(req.body.id, req.body)];
                    case 3:
                        _b.apply(void 0, [_c.sent()]);
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.put = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body;
                        return [4 /*yield*/, argon2_1["default"].hash(req.body.password)];
                    case 1:
                        _a.password = _c.sent();
                        _b = log;
                        return [4 /*yield*/, users_service_1["default"].putById(req.body.id, req.body)];
                    case 2:
                        _b.apply(void 0, [_c.sent()]);
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.removeUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = log;
                        return [4 /*yield*/, users_service_1["default"].deleteById(req.body.id)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        res.status(204).send();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = {
                    userId: req.body.userId,
                    name: req.body.name,
                    permissionFlags: req.body.permissionFlags,
                    authenticated: true,
                    jokerDriver: req.body.joker
                };
                res.status(200).send(user);
                return [2 /*return*/];
            });
        });
    };
    UsersController.prototype.sendResetEmail = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1["default"].createTransport({
                            host: "mail.cartribute.com ",
                            port: 587,
                            secure: false,
                            auth: {
                                user: "f1picante@cartribute.com",
                                pass: "bML)NQfSx1Jz"
                            }
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: '"F1Picante" <f1picante@cartribute.com>',
                                to: "hugogallor@gmail.com",
                                subject: "Hello ✔",
                                text: "Hello world?",
                                html: "<b>Hello world?</b>"
                            })];
                    case 1:
                        info = _a.sent();
                        console.log("Message sent: %s", info.messageId);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.sendResetEmailTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer_1["default"].createTransport({
                            host: "mail.cartribute.com ",
                            port: 587,
                            secure: false,
                            auth: {
                                user: "f1picante@cartribute.com",
                                pass: "bML)NQfSx1Jz"
                            }
                        });
                        return [4 /*yield*/, transporter.sendMail({
                                from: '"F1Picante" <f1picante@cartribute.com>',
                                to: "hugogallor@gmail.com",
                                subject: "Hello ✔",
                                text: "Hello world?",
                                html: "<b>Hello world?</b>"
                            })];
                    case 1:
                        info = _a.sent();
                        console.log("Message sent: %s", info.messageId);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
var users = new UsersController();
users.sendResetEmailTest();
exports["default"] = new UsersController();
