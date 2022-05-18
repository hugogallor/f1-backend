"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.F1InfoRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const f1info_controller_1 = __importDefault(require("./controllers/f1info.controller"));
class F1InfoRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'F1InfoRoutes');
    }
    configureRoutes() {
        //get all teams
        this.app.route('/teams')
            .get(f1info_controller_1.default.listTeams);
        //get race calendar
        this.app.route('/races')
            .get(f1info_controller_1.default.listRaces);
        //get specific race
        //param to indicate next race
        //agregar middleware de patch para checar que no haya "selecciona"?
        this.app.route('/races/:raceId')
            .get(f1info_controller_1.default.getRaceById)
            .patch(f1info_controller_1.default.patchRaceResults);
        this.app.route('/current')
            .get(f1info_controller_1.default.generateCurrentRaceInfo);
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
exports.F1InfoRoutes = F1InfoRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZjFpbmZvLnJvdXRlcy5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9mMWluZm8vZjFpbmZvLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBS3BFLHdGQUErRDtBQUUvRCxNQUFhLFlBQWEsU0FBUSx5Q0FBa0I7SUFDaEQsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO1FBQ1gsZUFBZTtRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNuQixHQUFHLENBQUMsMkJBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEMsbUJBQW1CO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxtQkFBbUI7UUFDbkIsNkJBQTZCO1FBQzdCLG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQUMsMkJBQWdCLENBQUMsV0FBVyxDQUFDO2FBQ2pDLEtBQUssQ0FBQywyQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBSWxELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUNqQixHQUFHLENBQUMsMkJBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUl0RCx5QkFBeUI7UUFDekI7Ozs7Ozs7Ozs7OztVQVlFO1FBRUYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FHSjtBQWhERCxvQ0FnREMifQ==