"use strict";
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
exports.emailPicks = exports.cutOffPenalty = void 0;
const f1info_service_1 = __importDefault(require("../f1info/services/f1info.service"));
const nodemailer_1 = __importDefault(require("nodemailer"));
function cutOffPenalty(picksData) {
    const dateNow = new Date();
    console.log("race to check", picksData.race);
    //convertir a fecha?
    picksData.race.schedule.FP1 = new Date(picksData.race.schedule.FP1);
    picksData.race.schedule.FP2 = new Date(picksData.race.schedule.FP2);
    picksData.race.schedule.FP3 = new Date(picksData.race.schedule.FP3);
    picksData.race.schedule.Qualy = new Date(picksData.race.schedule.Qualy);
    picksData.race.schedule.Race = new Date(picksData.race.schedule.Race);
    const nextCutOff = f1info_service_1.default.checkCutOff(dateNow, picksData.race);
    console.log("Check penalty", dateNow);
    console.log("Check penalty", picksData.race.schedule.FP1);
    //Next cutoff nos dice que estamos en la sesión de antes
    switch (nextCutOff) {
        case "FP1":
            return 0;
        case "FP2":
            return -30;
        case "FP3":
            return -60;
        case "Qualy":
            return -1;
        case "Race":
            return -1;
    }
    return 0;
}
exports.cutOffPenalty = cutOffPenalty;
function picksToHtml(picks) {
    let htmlString = `<div style="display:grid; grid-template-columns: 1fr 1fr><table>"`;
    const top5HtmlArray = picks.race.results.map((pick, i) => {
        return `<td><div class="driver-spot">
        <div class="driver-position" >${i + 1}</div>
        <div class="driver-info"> 
          ${pick.firstName}<br></br>
          ${pick.lastName}<br></br>
          ${pick.number}
        </div>
      </div></td>`;
    });
    const top5Html = `<div style="grid-column:1"><th><h2>Top 5</h2></th><tr>` + top5HtmlArray.reduce((prev, current) => prev + current) + `</div>`;
    const extraHtml = `
                    </tr><tr>
                    <div style="display:flex">
                        <tr><h2>Extra</h2></tr>
                        <td>
                        <div class="driver-spot" >
                            <div class="driver-position" >Pole</div>
                            <div class="driver-info"> 
                            ${picks.race.pole.firstName}<br></br>
                            ${picks.race.pole.lastName}<br></br>
                            ${picks.race.pole.number}
                            </div>
                        </div>
                        </td><td>
                        <div class="driver-spot">
                            <div class="driver-position" >Vuelta Rápida</div>
                            <div class="driver-info"> 
                            ${picks.race.fastestLap.firstName}<br></br>
                            ${picks.race.fastestLap.lastName}<br></br>
                            ${picks.race.fastestLap.number}
                            </div>
                        </div>
                        </td><td>
                        <div class="driver-spot">
                            <div class="driver-position" >Último lugar</div>
                            <div class="driver-info"> 
                            ${picks.race.lastPlace.firstName}<br></br>
                            ${picks.race.lastPlace.lastName}<br></br>
                            ${picks.race.lastPlace.number}
                            </div>
                        </div>
                        </td><td>
                        <div class="driver-spot">
                            <div class="driver-position" >Primer DNF</div>
                            <div class="driver-info"> 
                            ${picks.race.firstRetirement.firstName}<br></br>
                            ${picks.race.firstRetirement.lastName}<br></br>
                            ${picks.race.firstRetirement.number}
                            </div>
                        </div>
                        </td>
                    </div>
                    </tr>
                    </table>`;
    let bonusHtml = `<div><h2>Bonus </h2>`;
    picks.race.bonus.forEach(question => {
        const questionHtml = `${question.Q}:  ${question.R} <br>`;
        bonusHtml = bonusHtml + questionHtml;
    });
    return htmlString + top5Html + extraHtml + "</div>" + bonusHtml;
}
function getHtmlHead() {
    return `
    <!DOCTYPE html>
    <html>
    <head>
    <html>
    <head>
    <title>F1 Picante</title>
    <style>
        .driver-spot{
            background-color: #62759c;
            border-radius: 10px;
            font-size: 90%;
            margin-bottom: 10px;
            cursor:pointer;
            
            display: grid;
            grid-template-columns: 1fr 4fr;
            border: 1px solid black;
            opacity:1;
            
            
        }
        .driver-position{
  
            background-color: #a4b6da;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
           
            
          }
        .driver-info{
            padding:30px;
        }

    </style>
    </head>
    <body>
    
    `;
}
function emailPicks(email, picks) {
    return __awaiter(this, void 0, void 0, function* () {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "a2plcpnl0833.prod.iad2.secureserver.net",
            port: 465,
            secure: true,
            auth: {
                user: "f1picante@cartribute.com",
                pass: "bML)NQfSx1Jz", // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '"F1Picante" <f1picante@cartribute.com>',
            to: email,
            subject: "F1Picante confirmación de picks para " + picks.race.name,
            text: `Picks envaidos para ${picks.race.name}:  ${picks.race.results}`,
            html: `${getHtmlHead()}
                <h2>F1 Picante</h2>
                <div style="display:block">
                <img width="60" height="40" src="https://www.f1picante.cartribute.com/${picks.race.flagUrl}"/><br>
                        <p style="font-color:white">¡Picks recibidos!<br> 
                        <br>Estas son tus selecciones actuales para ${picks.race.name}</p>  
                </div>
                ${picksToHtml(picks)}
                </body>
                </html>
                `,
        });
        console.log("Message sent: %s", info.messageId);
    });
}
exports.emailPicks = emailPicks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Muc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9waWNrcy9waWNrcy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RkFBOEQ7QUFDOUQsNERBQW9DO0FBRXBDLFNBQWdCLGFBQWEsQ0FBQyxTQUFvQjtJQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxvQkFBb0I7SUFDcEIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BFLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRSxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEUsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hFLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0RSxNQUFNLFVBQVUsR0FBRyx3QkFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLElB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