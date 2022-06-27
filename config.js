"use strict";
exports.__esModule = true;
exports.mongooseDebug = exports.dbPort = exports.dbEndpoint = exports.serverPort = void 0;
var dotenv_1 = require("dotenv");
var dotenvResult = dotenv_1["default"].config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
exports.serverPort = process.env.PORT;
exports.dbEndpoint = process.env.DB_ENDPOINT;
exports.dbPort = process.env.DB_PORT;
exports.mongooseDebug = process.env.DB_DEBUG;
