import * as f1InfoDto from './f1info.dto' ;
import mongooseService from '../common/services/mongoose.service';


export  class F1InfoSchema {
    //todo static porque no hay que crear objeto de clase, solo queremos acceder a los miembros
    static Schema = mongooseService.getMongoose().Schema;
    
    //driver
    static driverSchema = new this.Schema<f1InfoDto.driver>({
        _id: {type:String},
        firstName: {type:String},
        lastName: {type:String},
        number: {type:Number},
        team: {type:String},
        positionsGained: {type: Number},
        points: {type: Number},
      });

      
      //team
    static teamSchema = new this.Schema<f1InfoDto.team>({
        _id:    {type:String} ,
        name:   {type:String},
        colorHex: {type:String},
        drivers:[this.driverSchema],
        PU: {type:String},
        logoUrl: {type:String}

    })

      //race
    static raceSchema = new this.Schema<f1InfoDto.race>({
        _id: {type:String},
        name: {type:String},
        race_id: {type:Number},
        country: {type:String},
        results: [this.driverSchema],
        fastestLap: this.driverSchema,
        lastPlace: this.driverSchema,
        firstRetirement: this.driverSchema,
        pole: this.driverSchema,
        raceJoker: this.driverSchema,
        topTeam: this.teamSchema,
        dnfResults:[this.driverSchema],
        schedule: {
            FP1: {type:Date},
            FP2: {type:Date},
            FP3: {type:Date},
            Qualy: {type:Date},
            Race: {type:Date}
        },
        team_rosters:[this.teamSchema],
        bonus:[
            {
                Q:{type:String},
                A:{type:Array, default: undefined},  //default undefined en los arreglos hace que no quiera siempre meter un arreglo vacio
                Q_id:{type:Number},
                R:{type:String},
                points:{type: Number},
            }]
      });


}
export default  F1InfoSchema;