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
function addPositionsGained() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield getPositionsGained(gridUrl, resultsUrl);
        return res;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUFVekMsZ0RBNENDO0FBcERELGtEQUE2QztBQUU3QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFFLHlFQUF5RSxDQUFDO0FBQ3ZGLElBQUksVUFBVSxHQUFFLHVFQUF1RSxDQUFDO0FBQ3hGLHVCQUF1QjtBQUV2QixTQUFzQixrQkFBa0IsQ0FBQyxPQUFjLEVBQUUsVUFBaUI7O1FBQ3RFLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLFlBQVksR0FBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBQzFCLElBQUcsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFrQixNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLG9CQUFvQjtZQUVwQiwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDakQscUJBQXFCO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQyxvQ0FBb0M7Z0JBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFL0MsQ0FBQyxDQUFDLENBQUE7WUFFSCwyQkFBMkI7WUFHMUIsTUFBTyxTQUFTLEdBQXFCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVEsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLG9DQUFvQztnQkFDcEMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVqRCxDQUFDLENBQUMsQ0FBQTtZQUVILDRCQUE0QjtZQUUzQixNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsd0JBQXdCO1lBQ3hCLHNCQUFzQjtZQUd0QixPQUFPLENBQUMsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBRS9DLENBQUM7UUFBQyxPQUFNLEtBQUssRUFBQyxDQUFDO1lBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUFBLENBQUM7SUFHcEMsQ0FBQztDQUFBO0FBRUQsU0FBZSxrQkFBa0I7O1FBQy9CLElBQUksR0FBRyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUFBIn0=