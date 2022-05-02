import mongoose from 'mongoose';
import debug, { IDebugger } from 'debug';
import {dbEndpoint, dbPort, mongooseDebug} from '../../config';

const log:IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        
      
    
    }

    constructor(){
        this.connectWithRetry();
        if(mongooseDebug === "true") mongoose.set('debug', true);
        
    }

    getMongoose(){
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose.connect('mongodb://'+ dbEndpoint + ':' + dbPort + '/f1', this.mongooseOptions)
            .then(() => {
                log(
                    'MongoDB is connected'
                    
                );
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection 
                    unsuccessful (will retry #${++this.count} 
                        after ${retrySeconds} seconds):`,
                    err

                );
                setTimeout(this.connectWithRetry, retrySeconds *1000);
            })

    }
}

export default new MongooseService();