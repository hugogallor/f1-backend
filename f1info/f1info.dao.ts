import {driver, team, bonusQuestion, race} from '../f1info/f1info.dto';
import mongooseService from '../common/services/mongoose.service';
import shortid from "shortid";
import debug from "debug";
import { F1InfoSchema } from './f1info.schema';

const log: debug.IDebugger = debug('app: f1info dao');

class F1infoDao{
    /*Schema = mongooseService.getMongoose().Schema;
    
    //schema for data representation
    raceSchema = new this.Schema<race>();
    teamSchema = new this.Schema<team>();
    //chance esta manera de representar un arreglo de schema no es necesaria
    teamsSchema = new this.Schema({
        teams:[new this.Schema<team>()]
    })
    driverSchema = new this.Schema<driver>();
    driversSchema = new this.Schema({
        drivers: [new this.Schema<driver>()],
    })*/
    //models for data storage
    driverSchema =  F1InfoSchema.driverSchema;
    raceSchema =  F1InfoSchema.raceSchema;
    teamSchema =  F1InfoSchema.teamSchema;
    drivers = mongooseService.getMongoose().model('drivers', this.driverSchema);
    teams = mongooseService.getMongoose().model('teams',this.teamSchema);
    race = mongooseService.getMongoose().model('races',this.raceSchema);

    constructor(){
        log('Created new instance of f1Info Dao');
        
    }

    async getDrivers(){
        return this.drivers.find().exec();  //tenía .populate('User') antes de exec. Pero crasheaba porque?
    }

    async getTeams(){
        return this.teams.find().exec();
    }

    async getRaces(){
        

        return this.race.find().exec();
    }

    async getRace(raceNumber: number){
        return this.race.findOne({ race_id: raceNumber}).exec();
    }
}
export default new F1infoDao();