"use strict";
//const axios = require('axios').default;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionsGained = getPositionsGained;
const axios_1 = __importDefault(require("axios"));
const cheerio = require('cheerio');
console.log("hey");
let gridUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/starting-grid";
let resultsUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/race-result";
addPositionsGained();
function getPositionsGained(gridUrl, resultsUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const driverGrid = [];
        const driverResult = [];
        let gained = [];
        try {
            const response = yield axios_1.default.get(gridUrl);
            //console.log("response", response);
            let $ = cheerio.load(response.data);
            //console.log(data);
            //const driver = $('.resultsarchive-table tr td:nth-child(3)');
            const driver = $('.f1-table tr td:nth-child(2)');
            //console.log(driver)
            driver.each((i, element) => {
                //console.log(i, $(element).text());
                driverGrid.push(parseInt($(element).text()));
            });
            // console.log(driverGrid);
            const responseR = yield axios_1.default.get(resultsUrl);
            $ = cheerio.load(responseR.data);
            const driverR = $('.f1-table tr td:nth-child(2)');
            driverR.each((i, element) => {
                //console.log(i, $(element).text());
                driverResult.push(parseInt($(element).text()));
            });
            //console.log(driverResult);
            gained = driverGrid.map((grid, i) => i - driverResult.indexOf(grid));
            //console.log("gained");
            //console.log(gained);
            return ({ drivers: driverGrid, gained: gained });
        }
        catch (error) {
            console.log(error);
        }
    });
}
function addPositionsGained() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield getPositionsGained(gridUrl, resultsUrl);
        return res;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUFVekMsZ0RBNENDO0FBcERELGtEQUE2QztBQUU3QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNsQixJQUFJLE9BQU8sR0FBRSx5RUFBeUUsQ0FBQztBQUN2RixJQUFJLFVBQVUsR0FBRSx1RUFBdUUsQ0FBQztBQUN4RixrQkFBa0IsRUFBRSxDQUFDO0FBRXJCLFNBQXNCLGtCQUFrQixDQUFDLE9BQWMsRUFBRSxVQUFpQjs7UUFDdEUsTUFBTSxVQUFVLEdBQVksRUFBRSxDQUFDO1FBQy9CLE1BQU0sWUFBWSxHQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLE1BQU0sR0FBWSxFQUFFLENBQUM7UUFDMUIsSUFBRyxDQUFDO1lBQ0gsTUFBTSxRQUFRLEdBQWtCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsb0JBQW9CO1lBRXBCLCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUNqRCxxQkFBcUI7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLG9DQUFvQztnQkFDcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUvQyxDQUFDLENBQUMsQ0FBQTtZQUVILDJCQUEyQjtZQUcxQixNQUFPLFNBQVMsR0FBcUIsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUSxFQUFFLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUMsb0NBQW9DO2dCQUNwQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWpELENBQUMsQ0FBQyxDQUFBO1lBRUgsNEJBQTRCO1lBRTNCLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSx3QkFBd0I7WUFDeEIsc0JBQXNCO1lBR3RCLE9BQU8sQ0FBQyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7UUFFL0MsQ0FBQztRQUFDLE9BQU0sS0FBSyxFQUFDLENBQUM7WUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQUEsQ0FBQztJQUdwQyxDQUFDO0NBQUE7QUFFRCxTQUFlLGtCQUFrQjs7UUFDL0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQUEifQ==