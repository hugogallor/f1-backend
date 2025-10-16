"use strict";
//const axios = require('axios').default;
// dejo de funcionar porque F1 cambió la pagina. 
//https://wanago.io/2025/02/17/cheerio-web-scraping/
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
let gridUrl = "https://www.formula1.com/en/results/2025/races/1270/singapore/starting-grid";
let resultsUrl = "https://www.formula1.com/en/results/2025/races/1270/singapore/race-result";
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
            const driver = $('[id="results-table"]').find('tbody').find('tr');
            //console.log(driver)
            driver.each((i, element) => {
                const driverNumber = $(element).find('td');
                //console.log("DRiver number " + $(driverNumber[1]).text());
                //console.log(i, $(element).text());
                //driverGrid.push(parseInt($(element).text()));
                driverGrid.push(parseInt($(driverNumber[1]).text()));
            });
            //console.log(driverGrid);
            const responseR = yield axios_1.default.get(resultsUrl);
            $ = cheerio.load(responseR.data);
            //const driverR = $('.f1-table tr td:nth-child(2)');
            const driverR = $('[id="results-table"]').find('tbody').find('tr');
            driverR.each((i, element) => {
                //console.log(i, $(element).text());
                const driverNumber = $(element).find('td');
                driverResult.push(parseInt($(driverNumber[1]).text()));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5QztBQUN6QyxpREFBaUQ7QUFDakQsb0RBQW9EOzs7Ozs7Ozs7Ozs7OztBQVdwRCxnREFpREM7QUF6REQsa0RBQTZDO0FBRTdDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxvQkFBb0I7QUFDcEIsSUFBSSxPQUFPLEdBQUUsNkVBQTZFLENBQUM7QUFDM0YsSUFBSSxVQUFVLEdBQUUsMkVBQTJFLENBQUM7QUFDNUYsa0JBQWtCLEVBQUUsQ0FBQztBQUVyQixTQUFzQixrQkFBa0IsQ0FBQyxPQUFjLEVBQUUsVUFBaUI7O1FBQ3RFLE1BQU0sVUFBVSxHQUFZLEVBQUUsQ0FBQztRQUMvQixNQUFNLFlBQVksR0FBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVksRUFBRSxDQUFDO1FBQzFCLElBQUcsQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFrQixNQUFNLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekQsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLG9CQUFvQjtZQUVwQiwrREFBK0Q7WUFDL0QsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRSxxQkFBcUI7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLDREQUE0RDtnQkFDNUQsb0NBQW9DO2dCQUNwQywrQ0FBK0M7Z0JBQy9DLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkQsQ0FBQyxDQUFDLENBQUE7WUFFRiwwQkFBMEI7WUFHMUIsTUFBTyxTQUFTLEdBQXFCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsb0RBQW9EO1lBQ3BELE1BQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVEsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLG9DQUFvQztnQkFDcEMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV6RCxDQUFDLENBQUMsQ0FBQTtZQUVILDRCQUE0QjtZQUUzQixNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsd0JBQXdCO1lBQ3hCLHNCQUFzQjtZQUd0QixPQUFPLENBQUMsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1FBRS9DLENBQUM7UUFBQyxPQUFNLEtBQUssRUFBQyxDQUFDO1lBQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUFBLENBQUM7SUFHcEMsQ0FBQztDQUFBO0FBRUQsU0FBZSxrQkFBa0I7O1FBQy9CLElBQUksR0FBRyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUFBIn0=