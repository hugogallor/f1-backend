import { userPicks } from "./picks.dto";
import F1InfoService from "../f1info/services/f1info.service";
import nodemailer from 'nodemailer';

//agregar función para verificar si solo cambió jokerCarrera? O que frontend lo comunique? Otro intento I guess? Como hacemos redeploy?
export function cutOffPenalty(picksData: userPicks) {
    const dateNow = new Date();
    console.log("race to check", picksData.race)
    //convertir a fecha?
    picksData.race.schedule.FP1 = new Date(picksData.race.schedule.FP1);
    picksData.race.schedule.FP2 = new Date(picksData.race.schedule.FP2);
    picksData.race.schedule.FP3 = new Date(picksData.race.schedule.FP3);
    picksData.race.schedule.Qualy = new Date(picksData.race.schedule.Qualy);
    picksData.race.schedule.Race = new Date(picksData.race.schedule.Race);
    const nextCutOff = F1InfoService.checkCutOff(dateNow, picksData.race);
    console.log("Check penalty", dateNow);
    console.log("Check penalty", picksData.race.schedule.FP1);
    
    //Next cutoff nos dice que estamos en la sesión de antes
    switch(nextCutOff){
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

function picksToHtml(picks: userPicks){
    let htmlString = `<div style="display:grid; grid-template-columns: 1fr 1fr><table>"`;
    const top5HtmlArray = picks.race.results.map((pick, i) =>{
        return `<td><div class="driver-spot">
        <div class="driver-position" >${i +1}</div>
        <div class="driver-info"> 
          ${pick.firstName}<br></br>
          ${pick.lastName}<br></br>
          ${pick.number}
        </div>
      </div></td>`
    })
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
            const questionHtml = `${question.Q}:  ${question.R} <br>`
            bonusHtml = bonusHtml + questionHtml;
        });

        return htmlString +top5Html + extraHtml + "</div>" + bonusHtml;

}

function getHtmlHead(){

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

export async function emailPicks(email: string, picks: userPicks){
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "a2plcpnl0833.prod.iad2.secureserver.net",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                user: "f1picante@cartribute.com", // generated ethereal user
                pass: "bML)NQfSx1Jz", // generated ethereal password
                },
            });
    
            // send mail with defined transport object
            let info = await transporter.sendMail({
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
}