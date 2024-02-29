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
const picks_dao_1 = __importDefault(require("./picks.dao"));
function comparePicks(userId, picksData) {
    return __awaiter(this, void 0, void 0, function* () {
        //checar si picks entrantes son iguales a lo que ya estaba en DB, sin contar al raceJoker
        //para ver si aplica penalty por ingreso tardío
        //queda un poco coupled esta función?
        const queryResult = yield picks_dao_1.default.getUserPicksByRace(userId, picksData.race.race_id.toString());
        if (queryResult !== -1 && queryResult) {
            const userPicks = queryResult;
            console.log("prev: ", userPicks);
            console.log("curr: ", picksData);
            const prevPenalty = userPicks.penalty; //si ya tenían penalty tiene que seguir aplicando. Sin esto podrían meter picks tardíos dos veces y evitar penalty
            if (prevPenalty < 0)
                return false;
            //if(userPicks==null) return -1;
            let match = true;
            match && (match = userPicks.race.fastestLap.number == picksData.race.fastestLap.number);
            match && (match = userPicks.race.pole.number == picksData.race.pole.number);
            match && (match = userPicks.race.firstRetirement.number == picksData.race.firstRetirement.number);
            match && (match = userPicks.race.lastPlace.number == picksData.race.lastPlace.number);
            match && (match = userPicks.race.dnfResults[0].number == picksData.race.dnfResults[0].number);
            match && (match = userPicks.race.topTeam.name == picksData.race.topTeam.name);
            let reduceRes = match && (match = userPicks.race.results[0].number == picksData.race.results[0].number);
            match && (match = JSON.stringify(userPicks.race.results) === JSON.stringify(picksData.race.results));
            match && (match = JSON.stringify(userPicks.race.bonus) === JSON.stringify(picksData.race.bonus));
            console.log("match ", match);
            return match;
        }
    });
}
//agregar función para verificar si solo cambió jokerCarrera? O que frontend lo comunique? Otro intento I guess? Como hacemos redeploy?
function cutOffPenalty(userId, picksData) {
    return __awaiter(this, void 0, void 0, function* () {
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
        //checamos si no hubo cambio de picks (sin contar raceJoker) porque no aplica penalty si solo cambiaron raceJoker
        const samePicks = yield comparePicks(userId, picksData);
        //Next cutoff nos dice que estamos en la sesión de antes
        switch (nextCutOff) {
            case "FP1":
                return 0;
            case "FP2":
                if (samePicks) {
                    return 0;
                }
                return -30;
            case "FP3":
                if (samePicks) {
                    return 0;
                }
                return -60;
            case "Qualy":
                if (samePicks) {
                    return 0;
                }
                return -1;
            case "Race":
                if (samePicks) {
                    return 0;
                }
                return -1;
        }
        return 0;
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Muc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9waWNrcy9waWNrcy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSx1RkFBOEQ7QUFDOUQsNERBQW9DO0FBQ3BDLDREQUFtQztBQUduQyxTQUFlLFlBQVksQ0FBQyxNQUFjLEVBQUUsU0FBb0I7O1FBQzVELHlGQUF5RjtRQUN6RiwrQ0FBK0M7UUFDL0MscUNBQXFDO1FBQ3JDLE1BQU0sV0FBVyxHQUFJLE1BQU0sbUJBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNsRyxJQUFHLFdBQVcsS0FBSyxDQUFDLENBQUMsSUFBSSxXQUFXLEVBQUM7WUFFakMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDO1lBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1lBRWxDLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBRSxrSEFBa0g7WUFDMUosSUFBSSxXQUFXLEdBQUcsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUNsQyxnQ0FBZ0M7WUFDaEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLEtBQUssS0FBTCxLQUFLLEdBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQztZQUNoRixLQUFLLEtBQUwsS0FBSyxHQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUM7WUFD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