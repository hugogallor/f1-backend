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
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const f1info_schema_1 = require("../../f1info/f1info.schema");
const mongoose_1 = require("mongoose");
const log = (0, debug_1.default)('app: in-memory-dao');
class UsersDao {
    constructor() {
        this.users = [];
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.userSchema = new this.Schema({
            _id: mongoose_service_1.default.getMongoose().Types.ObjectId,
            email: String,
            resetHash: { type: String, select: false },
            password: { type: String, select: false },
            firstName: String,
            lastName: String,
            permissionFlags: Number,
            jokerDriver: f1info_schema_1.F1InfoSchema.driverSchema,
        }, { id: false });
        this.User = (0, mongoose_1.model)('User', this.userSchema);
        log('Created new instance of UsersDao');
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = shortid_1.default.generate();
            const user = new this.User(Object.assign(Object.assign({ _id: userId }, userFields), { permissionFlags: 1 }));
            yield user.save();
            return userId;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email }).exec();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: userId }).exec(); //tenía .populate('User') antes de exec. Pero crasheaba porque?
        });
    }
    /*async getUsers(limit = 25, page = 0){
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }*/
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.find();
        });
    }
    updateUserById(userId, userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.User.findOneAndUpdate({ _id: userId }, { $set: userFields }, { new: true }).exec();
            return existingUser;
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.deleteOne({ _id: userId }).exec();
        });
    }
    getUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email })
                .select('_id email firstName lastName permissionFlags jokerDriver password').exec();
        });
    }
    setResetHash(email, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFields = { resetHash: hash };
            try {
                return this.User.findOneAndUpdate({ email: email }, { $set: userFields });
            }
            catch (error) {
                return -1;
            }
        });
    }
    getResetHash(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: userId }).select('resetHash');
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw4RkFBcUU7QUFDckUsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw4REFBMEQ7QUFFMUQsdUNBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXpELE1BQU0sUUFBUTtJQWlCVjtRQWhCQSxVQUFLLEdBQXdCLEVBQUUsQ0FBQztRQUVoQyxXQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFOUMsZUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QixHQUFHLEVBQUUsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNqRCxLQUFLLEVBQUUsTUFBTTtZQUNiLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztZQUN2QyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDdkMsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsZUFBZSxFQUFFLE1BQU07WUFDdkIsV0FBVyxFQUFFLDRCQUFZLENBQUMsWUFBWTtTQUN6QyxFQUFFLEVBQUMsRUFBRSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFFaEIsU0FBSSxHQUFHLElBQUEsZ0JBQUssRUFBTyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFSyxPQUFPLENBQUMsVUFBeUI7O1lBQ25DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMs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