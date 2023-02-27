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
            championDriver: f1info_schema_1.F1InfoSchema.driverSchema,
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
    updateJoker(userId, joker) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.User.findOneAndUpdate({ _id: userId }, { $set: { jokerDriver: joker } }, { new: true }).exec();
            return updatedUser;
        });
    }
    updateChampion(userId, champ) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.User.findOneAndUpdate({ _id: userId }, { $set: { championDriver: champ } }, { new: true }).exec();
            return updatedUser;
        });
    }
    getJoker(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: userId }).select('jokerDriver');
        });
    }
    getChampion(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: userId }).select('championDriver');
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw4RkFBcUU7QUFDckUsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw4REFBeUQ7QUFHekQsdUNBQXdDO0FBRXhDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXpELE1BQU0sUUFBUTtJQWtCVjtRQWpCQSxVQUFLLEdBQXdCLEVBQUUsQ0FBQztRQUVoQyxXQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFFOUMsZUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN6QixHQUFHLEVBQUUsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNqRCxLQUFLLEVBQUUsTUFBTTtZQUNiLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztZQUN2QyxRQUFRLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUM7WUFDdkMsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsZUFBZSxFQUFFLE1BQU07WUFDdkIsV0FBVyxFQUFFLDRCQUFZLENBQUMsWUFBWTtZQUN0QyxjQUFjLEVBQUUsNEJBQVksQ0FBQyxZQUFZO1NBQzVDLEVBQUUsRUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVoQixTQUFJLEdBQUcsSUFBQSxnQkFBSyxFQUFPLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVLLE9BQU8sQ0FBQyxVQUF5Qjs7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