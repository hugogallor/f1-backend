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
exports.cutOffPenalty = cutOffPenalty;
exports.emailPicks = emailPicks;
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
            match && (match = userPicks.race.topTeam.name == picksData.race.topTeam.name);
            match && (match = userPicks.race.results[0].number == picksData.race.results[0].number);
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
            secure: true, // true for 465, false for other ports
            auth: {
                user: "f1picante@cartribute.com", // generated ethereal user
                pass: "bML)NQfSx1Jz", // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '"F1Picante" <f1picante@cartribute.com>', // sender address
            to: email, // list of receivers
            subject: "F1Picante confirmación de picks para " + picks.race.name, // Subject line
            text: `Picks envaidos para ${picks.race.name}:  ${picks.race.results}`, // plain text body
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3Muc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9waWNrcy9waWNrcy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQW9DQSxzQ0FvQ0M7QUFxSEQsZ0NBaUNDO0FBN05ELHVGQUE4RDtBQUM5RCw0REFBb0M7QUFDcEMsNERBQW1DO0FBR25DLFNBQWUsWUFBWSxDQUFDLE1BQWMsRUFBRSxTQUFvQjs7UUFDNUQseUZBQXlGO1FBQ3pGLCtDQUErQztRQUMvQyxxQ0FBcUM7UUFDckMsTUFBTSxXQUFXLEdBQUksTUFBTSxtQkFBUSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLElBQUcsV0FBVyxLQUFLLENBQUMsQ0FBQyxJQUFJLFdBQVcsRUFBQyxDQUFDO1lBRWxDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQztZQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUUsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUUsQ0FBQztZQUVsQyxNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUUsa0hBQWtIO1lBQzFKLElBQUksV0FBVyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDbEMsZ0NBQWdDO1lBQ2hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztZQUNqQixLQUFLLEtBQUwsS0FBSyxHQUFNLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUM7WUFDaEYsS0FBSyxLQUFMLEtBQUssR0FBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLElB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