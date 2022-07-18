"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicksRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const controller_picks_1 = __importDefault(require("./controller/controller.picks"));
//import picksController from "./picks.controller";
class PicksRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'F1InfoRoutes');
    }
    configureRoutes() {
        //picks de todos (si se implementan ligas hay que seleccionar id de liga)
        //se necesita una manera de esconder picks 
        /*
        this.app.route('/picks/')
            .put(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)
            .delete(usersControllers.removeUser);
            */
        //picks de usuario (get y set) Agregar JST o auth eventualmente
        //
        this.app.route('/picks/:userId/')
            .put(controller_picks_1.default.upload)
            .get(controller_picks_1.default.getPicksByUserId);
        /*
        this.app.route('/picks/:userId/:raceId')
           .get(controllerPicks.getPicksByUserId)  */
        this.app.route('/standings')
            .get(controller_picks_1.default.getStandings);
        this.app.route('/standings/:raceId')
            .get(controller_picks_1.default.getRaceStandings);
        this.app.route('/picksRaces/:userId/')
            .get(controller_picks_1.default.userRaces);
        this.app.route('/picksCumulative')
            .get(controller_picks_1.default.cumulativeBreakdown);
        //results input
        /*
        this.app.route('/results/:raceId')
            .put(usersMiddleware.validateUserExists)
            .get(usersControllers.getUserById)
            */
        //Patch race with results
        /*
        this.app.patch('/users/:userId',[
            body('email').isEmail(),
                body('password').isLength({min: 5})
                    .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            usersMiddleware.validatePatchEmail,
            usersControllers.patch,
        ]);
        */
        return this.app;
    }
}
exports.PicksRoutes = PicksRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Mucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3BpY2tzL3BpY2tzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBS3BFLHFGQUE0RDtBQUM1RCxtREFBbUQ7QUFFbkQsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBQyxjQUFjLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNYLHlFQUF5RTtRQUN6RSwyQ0FBMkM7UUFDM0M7Ozs7O2NBS007UUFFTiwrREFBK0Q7UUFDL0QsRUFBRTtRQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO2FBQzVCLEdBQUcsQ0FBQywwQkFBZSxDQUFDLE1BQU0sQ0FBQzthQUMzQixHQUFHLENBQUMsMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3pDOztxREFFNkM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO2FBQ3ZCLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBRXRDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2FBQy9CLEdBQUcsQ0FBQywwQkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFFMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7YUFDakMsR0FBRyxDQUFDLDBCQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7UUFFbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7YUFDN0IsR0FBRyxDQUFDLDBCQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUM3QyxlQUFlO1FBQ2Y7Ozs7Y0FJTTtRQUtOLHlCQUF5QjtRQUN6Qjs7Ozs7Ozs7Ozs7O1VBWUU7UUFFRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUdKO0FBL0RELGtDQStEQyJ9