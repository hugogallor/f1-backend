import {driver, team, bonusQuestion,bonusQuestionResult, race, raceResults, bonusInterface,} from '../f1info/f1info.dto';
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

    async patchRaceTop5(raceNumber: number, raceResults: raceResults){
        //estamos usando el schema de race, pero sin todos los campos (en UI top5 = results)
        //parece que los arreglos de la interfaz se agregan siempre vacíos
        type raceUpload = Omit<race, "team_rosters" | "bonus" | "_id" | "name" | "race_id" | "country" |"schedule" |"flagUrl" >
        const race: raceUpload = {
            results: raceResults.top5,
            fastestLap: raceResults.extraFastLap,
            lastPlace: raceResults.extraLast,
            firstRetirement: raceResults.extraDNF,
            pole: raceResults.extraPole,

        }
        //log("f1info.dao data",race);
        const result = await this.race.findOneAndUpdate({race_id:raceNumber}, {$set:race},{new:true});
        if(result != null){
            // log("f1info.dao results",result.results);
            return 1;
        }
        return -1;
        
        
    }

    async patchRaceQuestions(raceNumber: number, questions: Array<bonusQuestion>){
        let uploadQ: bonusInterface = {
            bonus: [...questions],
        }
        //inicializamos variable "vacia"
        /*
        uploadQ = {bonus: [{Q_id: 0, R:""}]}

        questions.forEach((question,i) => {
            const answer: bonusQuestionResult = {Q_id: question.Q_id, R: question.A}
            uploadQ.bonus[question.Q_id]= answer;
            //const result = await this.race.findOneAndUpdate({race_id: raceNumber}, {$set: {uploadQ.bonus: }},{new:true});
        }); 
*/
        //const result = await this.questionResult.findOneAndUpdate({race_id: raceNumber}, {$set: uploadQ},{new:true});
        const result = await this.race.findOneAndUpdate({race_id: raceNumber}, {$set: uploadQ},{new:true});
        log("updateQA", result);
    }
}
export default new F1infoDao();