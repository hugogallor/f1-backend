import * as picksDto from './picks.dto' ;
import mongooseService from '../common/services/mongoose.service';
import  { F1InfoSchema } from '../f1info/f1info.schema';


export  class picksSchema {
    //todo static porque no hay que crear objeto de clase, solo queremos acceder a los miembros
    static Schema = mongooseService.getMongoose().Schema;
   
    //picks -extiende race y agrega userId
    static userPicks =  new this.Schema<picksDto.userPicks>({
        userId:{type:String},
        userPoints:{type:Number},
        penalty: {type: Number},
        jokerDriver:{ type: F1InfoSchema.driverSchema },
        race: {type: F1InfoSchema.raceSchema}
    });
    
    
}