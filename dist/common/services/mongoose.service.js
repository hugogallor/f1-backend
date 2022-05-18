"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const config_1 = require("../../config");
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        };
        this.connectWithRetry = () => {
            log('Attempting MongoDB connection (will retry if needed)');
            mongoose_1.default.connect(config_1.dbEndpoint + '', this.mongooseOptions)
                .then(() => {
                log('MongoDB is connected');
            })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection 
                    unsuccessful (will retry #${++this.count} 
                        after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
        if (config_1.mongooseDebug === "true") {
            log("mongoose Service debug set true");
            mongoose_1.default.set('debug', true);
        }
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tb25nb29zZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGtEQUF5QztBQUN6Qyx5Q0FBK0Q7QUFFL0QsTUFBTSxHQUFHLEdBQWEsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVwRCxNQUFNLGVBQWU7SUFXakI7UUFWUSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysb0JBQWUsR0FBRztZQUN0QixlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLHdCQUF3QixFQUFFLElBQUk7U0FJakMsQ0FBQTtRQWNELHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUNwQixHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUM1RCxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxtQkFBVSxHQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUNoRCxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNQLEdBQUcsQ0FDQyxzQkFBc0IsQ0FFekIsQ0FBQztZQUNOLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDWCxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FDQztnREFDNEIsRUFBRSxJQUFJLENBQUMsS0FBSztnQ0FDNUIsWUFBWSxZQUFZLEVBQ3BDLEdBQUcsQ0FFTixDQUFDO2dCQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFBO1FBRVYsQ0FBQyxDQUFBO1FBaENHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUcsc0JBQWEsS0FBSyxNQUFNLEVBQUM7WUFDeEIsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDdkMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQUM7SUFFckMsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLGtCQUFRLENBQUM7SUFDcEIsQ0FBQztDQXdCSjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==