import { CreateUserDTO } from "../dto/create.user.dto";
import { PatchUserDTO } from "../dto/patch.user.dto";
import { PutUserDTO } from "../dto/put.user.dto";
import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";
import { F1InfoSchema } from '../../f1info/f1info.schema';

const log: debug.IDebugger = debug('app: in-memory-dao');

class UsersDao{
    users: Array<CreateUserDTO> =[];

    Schema = mongooseService.getMongoose().Schema;
    
    userSchema = new this.Schema({
        _id: mongooseService.getMongoose().Types.ObjectId,
        email: String,
        password: {type: String, select: false},
        firstName: String,
        lastName: String,
        permissionFlags: Number,
        jokerDriver: F1InfoSchema.driverSchema,
    }, {id: false});

    User = mongooseService.getMongoose().model('User', this.userSchema);
    constructor(){
        log('Created new instance of UsersDao');
    }

    async addUser(userFields: CreateUserDTO){
        const userId = shortid.generate();
        const user = new this.User({
            _id: userId,
            ...userFields,
            permissionFlags: 1,
        });
        await user.save();
        return userId;

    }

    async getUserByEmail(email: String){
        return this.User.findOne({email: email}).exec();
    }

    async getUserById(userId: String){
        
        return this.User.findOne({_id:userId}).exec();  //tenía .populate('User') antes de exec. Pero crasheaba porque?
    }

    /*async getUsers(limit = 25, page = 0){
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }*/

    async getUsers(){
        return this.User.find().exec();
    }

    async updateUserById(
        userId: String,
        userFields: PatchUserDTO | PutUserDTO
    ){
        const existingUser = await this.User.findOneAndUpdate(
            {_id: userId},
            {$set: userFields},
            {new: true},
           
        ).exec();

        return existingUser;
    }

    async removeUserById(userId: String){
        return this.User.deleteOne({_id: userId}).exec();
    }

    async getUserByEmailWithPassword(email: string){
        return this.User.findOne({ email: email})
            .select('_id email firstName lastName permissionFlags jokerDriver password').exec();
    }

   
}

export default new UsersDao();