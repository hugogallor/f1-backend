"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var debug_1 = require("debug");
var config_1 = require("../../config");
var log = (0, debug_1["default"])('app:mongoose-service');
var MongooseService = /** @class */ (function () {
    function MongooseService() {
        var _this = this;
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        };
        this.connectWithRetry = function () {
            log('Attempting MongoDB connection (will retry if needed)');
            mongoose_1["default"].connect(config_1.dbEndpoint + '', _this.mongooseOptions)
                .then(function () {
                log('MongoDB is connected');
            })["catch"](function (err) {
                var retrySeconds = 5;
                log("MongoDB connection \n                    unsuccessful (will retry #".concat(++_this.count, " \n                        after ").concat(retrySeconds, " seconds):"), err);
                setTimeout(_this.connectWithRetry, retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
        if (config_1.mongooseDebug === "true") {
            log("mongoose Service debug set true");
            mongoose_1["default"].set('debug', true);
        }
    }
    MongooseService.prototype.getMongoose = function () {
        return mongoose_1["default"];
    };
    return MongooseService;
}());
exports["default"] = new MongooseService();
