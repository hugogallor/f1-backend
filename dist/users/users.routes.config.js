"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controllers_1 = __importDefault(require("./controllers/users.controllers"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route('/users')
            .get(users_controllers_1.default.listUsers)
            .post((0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 5 })
            .withMessage('Must include password (5+ characters)'), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controllers_1.default.createUser);
        this.app.param('userId', users_middleware_1.default.extractUserID);
        this.app.route('/users/:userId')
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controllers_1.default.getUserById)
            .delete(users_controllers_1.default.removeUser);
        this.app.put('/users/:userId', [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password').isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controllers_1.default.put,
        ]);
        this.app.patch('/users/:userId', [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password').isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            users_controllers_1.default.patch,
        ]);
        this.app.post('/login', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), 
        //usersMiddleware.hashBodyPassword,
        users_middleware_1.default.authenticateUser, users_controllers_1.default.login);
        //usuario quiere resetear contraseña, 
        //verificar que existe, crear hash, enviar mail, avisar a usuario
        this.app.post('/user/reset', (0, express_validator_1.body)('email').isEmail(), users_middleware_1.default.setResetHash, users_controllers_1.default.sendResetEmail);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBR3BFLHdGQUErRDtBQUMvRCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF5QztBQUd6QyxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDL0MsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ25CLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxTQUFTLENBQUM7YUFDL0IsSUFBSSxDQUNELElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQzthQUM5QixXQUFXLENBQUMsdUNBQXVDLENBQUMsRUFDekQsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDBCQUFlLENBQUMsNEJBQTRCLEVBQzVDLDJCQUFnQixDQUFDLFVBQVUsQ0FDOUIsQ0FBQztRQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSwwQkFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQzNCLEdBQUcsQ0FBQywwQkFBZSxDQUFDLGtCQUFrQixDQUFDO2FBQ3ZDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxXQUFXLENBQUM7YUFDakMsTUFBTSxDQUFDLDJCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFDO1lBQzFCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQztpQkFDOUIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDO1lBQzdELElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFBLHdCQUFJLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsaUNBQWlDO1lBQ2pELDJCQUFnQixDQUFDLEdBQUc7U0FFdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUM7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNuQixJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDO2lCQUM5QixXQUFXLENBQUMsdUNBQXVDLENBQUM7WUFDN0QsSUFBQSx3QkFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM1QixJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUEsd0JBQUksRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMvQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MsMEJBQWUsQ0FBQyxrQkFBa0I7WUFDbEMsMkJBQWdCLENBQUMsS0FBSztTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQ3RCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUMzQixtQ0FBbUM7UUFDbkMsMEJBQWUsQ0FBQyxnQkFBZ0IsRUFDaEMsMkJBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFdkIsc0NBQXNDO1FBQ3RDLGlFQUFpRTtRQUNqRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQzNCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFDdkIsMEJBQWUsQ0FBQyxZQUFZLEVBQzVCLDJCQUFnQixDQUFDLGNBQWMsQ0FFOUIsQ0FBQTtRQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBR0o7QUFwRUQsa0NBb0VDIn0=