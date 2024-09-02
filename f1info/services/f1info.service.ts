import express, { query } from 'express';
import debug from 'debug';
import f1infoDao from '../../f1info/f1info.dao';
import { race } from '../f1info.dto';
import UsersDao from '../../users/daos/users.dao';
import picksDao from '../../picks/picks.dao';
import { userPicks } from '../../picks/picks.dto';
import {user}  from '../../users/dto/create.user.dto';
import { points } from '../../picks/picks.points';
//import { picksSchema } from '../../picks/picks.schema';

const log: debug.IDebugger = debug('app: f1info service');
 class  F1InfoService{
   
    checkCutOff(now: Date, raceSchedule: race){
        let nextCutOff = "FP1";
        log('now',now.toISOString());
        log('fp2', raceSchedule.schedule.FP2.toISOString());

        log('now',now.toLocaleDateString());
        log('fp2', raceSchedule.schedule.FP2.toLocaleDateString());

        log('now',now.toUTCString());
        log('fp2', raceSchedule.schedule.FP2.toUTCString());
        if(now.toISOString() > raceSchedule.schedule.FP1.toISOString()) nextCutOff = "FP2";
        if(now.toISOString() > raceSchedule.schedule.FP2.toISOString()) nextCutOff = "FP3";
        if(now.toISOString() > raceSchedule.schedule.FP3.toISOString()) nextCutOff = "Qualy";
        if(now.toISOString() > raceSchedule.schedule.Qualy.toISOString()) nextCutOff = "Race";
        return nextCutOff;
    }

    findNextRace(now: Date, races: race[]){
        return races.find(( race ) => now.toISOString() < race.schedule.Race.toISOString())
    }

    async setUserResults(raceId: number, raceResults: race)
    {
        //get users
        const users: Array<user> = await UsersDao.getUsers();
       // console.log(users);

        for (const user of users) {
            const queryResult = await  picksDao.getUserPicksByRace(user._id, raceId.toString())
            
            if(queryResult !== -1 && queryResult){
               
                const userPicks = queryResult;
                let userPoints = 0;
                //top5
                userPicks.race.results.forEach((userDriver, i) => {
                    if(userDriver.number === raceResults.results[i].number){
                         userDriver.points = points.top5[i];
                         userPoints += points.top5[i];
                    }
                    else{ userDriver.points = 0}
                });
                //topTeam
                if(userPicks.race.topTeam.name === raceResults.topTeam.name){
                    userPicks.race.topTeam.points = points.topTeam;
                    userPoints += points.topTeam;
                }
                else{ userPicks.race.topTeam.points = 0 }
                //extra
                if(userPicks.race.fastestLap.number === raceResults.fastestLap.number){
                    userPicks.race.fastestLap.points = points.fastestLap;
                    userPoints += points.fastestLap;
                } else { userPicks.race.fastestLap.points = 0;}
//hay gente que no metió piloto para firstRet
//para calculo de primera carrera, usar apellido del piloto. Cambiar después por si hay pilotos con mismo apellido?
                if( raceResults.dnfResults?.some((dnfDriver) => dnfDriver.lastName === userPicks.race.firstRetirement.lastName)){
                    console.log("dnf Result:" + raceResults.dnfResults);
                    console.log("dnf user:" + userPicks.race.firstRetirement);
                    userPicks.race.firstRetirement.points = points.firstRetirement; 
                    userPoints += points.firstRetirement;
                } else { userPicks.race.firstRetirement.points = 0;}

                if(userPicks.race.pole.number === raceResults.pole.number){
                    userPicks.race.pole.points = points.pole; 
                    userPoints += points.pole;
                } else { userPicks.race.pole.points = 0;}

                if(userPicks.race.lastPlace.number === raceResults.lastPlace.number){
                    userPicks.race.lastPlace.points = points.lastPlace;
                    userPoints += points.lastPlace;
                } else { userPicks.race.lastPlace.points = 0;}

                //bonus 
                userPicks.race.bonus.forEach((question,i) => {
                    if(question.R === raceResults.bonus[i].R){
                        question.points = points.bonusQuestion;
                        userPoints += points.bonusQuestion;
                    }else{ question.points = 0 }
                })

                //joker
                const joker = userPicks.jokerDriver;
                const resultsTeam = raceResults.team_rosters.find((team) => team.drivers.some((driver) => driver.number === joker.number));
                if(resultsTeam) {
                   // console.log("your joker's team is: ", resultsTeam);
                    const resultsDriver = resultsTeam.drivers.find((driver)=> driver.number === joker.number);
                    if(resultsDriver){
                     //   console.log("your joker gained: ", resultsDriver.positionsGained);
                        if(resultsDriver.positionsGained !== undefined){
                             if(resultsDriver.positionsGained > 0){
                                 userPicks.jokerDriver.points = points.joker * resultsDriver.positionsGained;
                                 userPoints += points.joker * resultsDriver.positionsGained;
                             }
                             else { userPicks.jokerDriver.points = 0}
                        }  else { userPicks.jokerDriver.points = 0}

                    }

                }

                //raceJoker
                const raceJoker = userPicks.race.raceJoker;
                if(raceJoker.firstName == "Selecciona"){
                    userPicks.race.raceJoker.points = 0;
                    console.log("raceJoker Selecciona ", resultsTeam);
                }
                else{
                    const resultsTeamRJ = raceResults.team_rosters.find((team) => team.drivers.some((driver) => driver.number === raceJoker.number));
                    if(resultsTeamRJ) {
                    // console.log("your joker's team is: ", resultsTeam);
                        const resultsDriver = resultsTeamRJ.drivers.find((driver)=> driver.number === raceJoker.number);
                        if(resultsDriver){
                        //   console.log("your joker gained: ", resultsDriver.positionsGained);
                            if(resultsDriver.positionsGained !== undefined){
                                //no nos importa si son negativos o no                            
                                userPicks.race.raceJoker.points = points.joker * resultsDriver.positionsGained;
                                userPoints += points.joker * resultsDriver.positionsGained;                            
                                
                            }  else { userPicks.race.raceJoker.points = 0}

                        }

                    }
                    else {
                        //Si dejaron As en blanco. Asignar 0 puntos
                        userPicks.race.raceJoker.points = 0;
                    }
                }
               
                


                //log("user Penalty" , userPicks.penalty)
                userPoints += userPicks.penalty;
                userPicks.userPoints = userPoints;
                const saveResult = await userPicks.save();
                console.log("saveResult", saveResult)
            }

        }
        
    }
}

export default new F1InfoService();