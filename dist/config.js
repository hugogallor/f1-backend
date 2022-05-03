"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseDebug = exports.dbPort = exports.dbEndpoint = exports.serverPort = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
exports.serverPort = process.env.PORT;
exports.dbEndpoint = process.env.DB_ENDPOINT;
exports.dbPort = process.env.DB_PORT;
exports.mongooseDebug = process.env.DB_DEBUG;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixNQUFNLFlBQVksR0FBRyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRTtJQUNwQixNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7Q0FDNUI7QUFHZSxRQUFBLFVBQVUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztBQUM3QixRQUFBLFVBQVUsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztBQUNwQyxRQUFBLE1BQU0sR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUM1QixRQUFBLGFBQWEsR0FBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyJ9