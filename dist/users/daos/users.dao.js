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
        this.User = mongoose_service_1.default.getMongoose().model('User', this.userSchema);
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
            return this.User.find().exec();
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
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSw4RkFBcUU7QUFDckUsc0RBQThCO0FBQzlCLGtEQUEwQjtBQUMxQiw4REFBMEQ7QUFFMUQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxRQUFRO0lBaUJWO1FBaEJBLFVBQUssR0FBd0IsRUFBRSxDQUFDO1FBRWhDLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxlQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEdBQUcsRUFBRSwwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRO1lBQ2pELEtBQUssRUFBRSxNQUFNO1lBQ2IsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFDO1lBQ3ZDLFFBQVEsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBQztZQUN2QyxTQUFTLEVBQUUsTUFBTTtZQUNqQixRQUFRLEVBQUUsTUFBTTtZQUNoQixlQUFlLEVBQUUsTUFBTTtZQUN2QixXQUFXLEVBQUUsNEJBQVksQ0FBQyxZQUFZO1NBQ3pDLEVBQUUsRUFBQyxFQUFFLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVoQixTQUFJLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoRSxHQUFHLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUssT0FBTyxDQUFDLFVBQXlCOztZQUNuQyxNQUFNLE1BQU0sR0FBRyxpQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksK0JBQ3RCLEdBQUcsRUFBRSxNQUFNLElBQ1IsVUFBVSxLQUNiLGVBQWUsRUFBRSxDQUFDLElBQ3BCLENBQUM7WUFDSCxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixPQUFPLE1BQU0sQ0FBQztRQUVsQixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsS0FBYTs7WUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxNQUFjOztZQUU1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBRSwrREFBK0Q7UUFDbkgsQ0FBQztLQUFBO0lBRUQ7Ozs7O09BS0c7SUFFRyxRQUFROztZQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQ2hCLE1BQWMsRUFDZCxVQUFxQzs7WUFFckMsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUNqRCxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsRUFDYixFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsRUFDbEIsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFDLENBRWQsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVULE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxNQUFjOztZQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsR0FBRyxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckQsQ0FBQztLQUFBO0lBRUssMEJBQTBCLENBQUMsS0FBYTs7WUFDMUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztpQkFDcEMsTUFBTSxDQUFDLG1FQUFtRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUYsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLEtBQWEsRUFBRSxJQUFZOztZQUMxQyxNQUFNLFVBQVUsR0FBaUIsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDbkQsSUFBRztnQkFDQSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQzthQUNyRTtZQUNELE9BQU0sS0FBSyxFQUFDO2dCQUNSLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDYjtRQUNMLENBQUM7S0FBQTtDQUdKO0FBRUQsa0JBQWUsSUFBSSxRQUFRLEVBQUUsQ0FBQyJ9