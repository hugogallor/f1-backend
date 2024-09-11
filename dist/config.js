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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QixNQUFNLFlBQVksR0FBRyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JCLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztBQUM3QixDQUFDO0FBR2UsUUFBQSxVQUFVLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDN0IsUUFBQSxVQUFVLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7QUFDcEMsUUFBQSxNQUFNLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDNUIsUUFBQSxhQUFhLEdBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMifQ==