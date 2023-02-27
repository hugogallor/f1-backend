import mongooseService from "../common/services/mongoose.service";
import debug from "debug";
import { picksSchema } from "./picks.schema";
import mongoose from "mongoose";
import { userPicks, standingsAggregation, getBreakdownPipeline , getRaceStandingsPipeline, getCumulativePointsPipeline} from "./picks.dto";

const log: debug.IDebugger = debug('app: picks dao');

export class PicksDao{
   //Schema
    picksSchema = picksSchema.userPicks;
    
   //Models
    userPicksUpload = mongooseService.getMongoose().model('picks', this.picksSchema);
    
    //DB operations
    async uploadPicks(userId: string, picksData: userPicks){
        //insertamos datos que se enviaron en el body del PUT
        //sin el _id:false mongoose intenta meter otro _id y falla porque es inmutable
        const picks = new this.userPicksUpload({
            ...picksData,
        },{_id:false})                                                      
        //find one and update with upsert crea el documento si no existe, lo actualiza si ya existe
        // https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        const result = this.userPicksUpload.findOneAndUpdate(
            {userId:userId,'race.race_id':picksData.race.race_id },
            {$set:picks},
            {upsert: true, new:true}
              );
        return result;
    }

    async getUserPicks(userId: string){
        return this.userPicksUpload.find({userId: userId}).exec();
    }

    async getUserPicksByRace(userId: string, raceId:string){
        try{
            const raceNumber = parseInt(raceId);
            //no se por que no puedo asignarle a query el tipo userPicks
            const query = await this.userPicksUpload.findOne({userId: userId, "race.race_id" :raceNumber});
            return query;
        }
        catch(error){
            log(error);
            return -1;
        }
        
    }

    async aggregateStandings(){
        try{
            const standings = await this.userPicksUpload.aggregate(standingsAggregation);
            return standings;
        }
        catch(error){
            log(error);
            return -1;
        }
    }

    async racesBreakdown(userId: string){
        const userRaces = await this.userPicksUpload.aggregate(getBreakdownPipeline(userId));
        return userRaces;
    }

    async raceStandings(raceId: string){
        const standings = await this.userPicksUpload.aggregate(getRaceStandingsPipeline(raceId));
        return standings;
    }

    async cumulativePoints(){
        const cumulative = await this.userPicksUpload.aggregate(getCumulativePointsPipeline());
        return cumulative;
    }

    async updateJoker(){

    }

    async updateChampion(){
        
    }

}
export default new PicksDao();