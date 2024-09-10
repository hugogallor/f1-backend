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
exports.getPositionsGained = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = require('cheerio');
//console.log("hey")
let gridUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/starting-grid";
let resultsUrl = "https://www.formula1.com/en/results/2024/races/1244/italy/race-result";
//addPositionsGained();
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
exports.getPositionsGained = getPositionsGained;
function addPositionsGained() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield getPositionsGained(gridUrl, resultsUrl);
        return res;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7O0FBRXpDLGtEQUE2QztBQUU3QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFFLHlFQUF5RSxDQUFDO0FBQ3ZGLElBQUksVUFBVSxHQUFFLHVFQUF1RSxDQUFDO0FBQ3hGLHVCQUF1QjtBQUV2QixTQUFzQixrQkFBa0IsQ0FBQyxPQUFjLEVBQUUsVUFBaUI7O1FBQ3RFLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLFlBQVksR0FBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBQzFCLElBQUc7WUFDRixNQUFNLFFBQVEsR0FBa0IsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELG9DQUFvQztZQUNwQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxvQkFBb0I7WUFFcEIsK0RBQStEO1lBQy9ELE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2pELHFCQUFxQjtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUyxFQUFFLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUMsb0NBQW9DO2dCQUNwQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRS9DLENBQUMsQ0FBQyxDQUFBO1lBRUgsMkJBQTJCO1lBRzFCLE1BQU8sU0FBUyxHQUFxQixNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFakUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFRLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQyxvQ0FBb0M7Z0JBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakQsQ0FBQyxDQUFDLENBQUE7WUFFSCw0QkFBNEI7WUFFM0IsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLHdCQUF3QjtZQUN4QixzQkFBc0I7WUFHdEIsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUU5QztRQUFDLE9BQU0sS0FBSyxFQUFDO1lBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUFDO0lBR3BDLENBQUM7Q0FBQTtBQTVDRCxnREE0Q0M7QUFFRCxTQUFlLGtCQUFrQjs7UUFDL0IsSUFBSSxHQUFHLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDeEQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQUEifQ==