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
let gridUrl = "https://www.formula1.com/en/results.html/2023/races/1141/bahrain/starting-grid.html";
let resultsUrl = "https://www.formula1.com/en/results.html/2023/races/1141/bahrain/race-result.html";
//addPositionsGained();
function getPositionsGained(gridUrl, resultsUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const driverGrid = [];
        const driverResult = [];
        let gained = [];
        try {
            const response = yield axios_1.default.get(gridUrl);
            // console.log("response", response);
            let $ = cheerio.load(response.data);
            //console.log(data);
            const driver = $('.resultsarchive-table tr td:nth-child(3)');
            driver.each((i, element) => {
                console.log(i, $(element).text());
                driverGrid.push(parseInt($(element).text()));
            });
            console.log(driverGrid);
            const responseR = yield axios_1.default.get(resultsUrl);
            $ = cheerio.load(responseR.data);
            const driverR = $('.resultsarchive-table tr td:nth-child(3)');
            driverR.each((i, element) => {
                console.log(i, $(element).text());
                driverResult.push(parseInt($(element).text()));
            });
            console.log(driverResult);
            gained = driverGrid.map((grid, i) => i - driverResult.indexOf(grid));
            console.log(gained);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7O0FBRXpDLGtEQUE2QztBQUU3QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsb0JBQW9CO0FBQ3BCLElBQUksT0FBTyxHQUFFLHFGQUFxRixDQUFDO0FBQ25HLElBQUksVUFBVSxHQUFFLG1GQUFtRixDQUFDO0FBQ3BHLHVCQUF1QjtBQUV2QixTQUFzQixrQkFBa0IsQ0FBQyxPQUFjLEVBQUUsVUFBaUI7O1FBQ3RFLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLFlBQVksR0FBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBQzFCLElBQUc7WUFDRixNQUFNLFFBQVEsR0FBa0IsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELHFDQUFxQztZQUNwQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxvQkFBb0I7WUFFcEIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRS9DLENBQUMsQ0FBQyxDQUFBO1lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUd4QixNQUFPLFNBQVMsR0FBcUIsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsMENBQTBDLENBQUMsQ0FBQztZQUM5RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBUSxFQUFFLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2xDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakQsQ0FBQyxDQUFDLENBQUE7WUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTFCLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBR3BCLE9BQU8sQ0FBQyxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7U0FFOUM7UUFBQyxPQUFNLEtBQUssRUFBQztZQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7U0FBQztJQUdwQyxDQUFDO0NBQUE7QUF6Q0QsZ0RBeUNDO0FBRUQsU0FBZSxrQkFBa0I7O1FBQy9CLElBQUksR0FBRyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUFBIn0=