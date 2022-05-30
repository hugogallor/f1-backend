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
let gridUrl = "https://www.formula1.com/en/results.html/2022/races/1124/bahrain/starting-grid.html";
let resultsUrl = "https://www.formula1.com/en/results.html/2022/races/1124/bahrain/race-result.html";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRjFzY3JhcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9mMWluZm8vc2VydmljZXMvRjFzY3JhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7O0FBRXpDLGtEQUE2QztBQUU3QyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsSUFBSSxPQUFPLEdBQUUscUZBQXFGLENBQUM7QUFDbkcsSUFBSSxVQUFVLEdBQUUsbUZBQW1GLENBQUM7QUFFcEcsU0FBc0Isa0JBQWtCLENBQUMsT0FBYyxFQUFFLFVBQWlCOztRQUN0RSxNQUFNLFVBQVUsR0FBWSxFQUFFLENBQUM7UUFDL0IsTUFBTSxZQUFZLEdBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksTUFBTSxHQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFHO1lBQ0YsTUFBTSxRQUFRLEdBQWtCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxxQ0FBcUM7WUFDcEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsb0JBQW9CO1lBRXBCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFTLEVBQUUsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUvQyxDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFHeEIsTUFBTyxTQUFTLEdBQXFCLE1BQU0sZUFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVqRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7WUFDOUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVEsRUFBRSxPQUFnQixFQUFFLEVBQUU7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWpELENBQUMsQ0FBQyxDQUFBO1lBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUUxQixNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUdwQixPQUFPLENBQUMsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBRTlDO1FBQUMsT0FBTSxLQUFLLEVBQUM7WUFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQUM7SUFHcEMsQ0FBQztDQUFBO0FBekNELGdEQXlDQyJ9