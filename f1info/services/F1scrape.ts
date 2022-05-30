//const axios = require('axios').default;

import axios, { AxiosResponse } from "axios";

const cheerio = require('cheerio');
let gridUrl ="https://www.formula1.com/en/results.html/2022/races/1124/bahrain/starting-grid.html";
let resultsUrl ="https://www.formula1.com/en/results.html/2022/races/1124/bahrain/race-result.html";

export async function getPositionsGained(gridUrl:string, resultsUrl:string){
    const driverGrid:number[] = [];
    const driverResult:number[] = [];
    let gained:number[]  =[];
   try{ 
    const response: AxiosResponse = await axios.get(gridUrl);
   // console.log("response", response);
    let $ = cheerio.load(response.data);
    //console.log(data);
  
    const driver = $('.resultsarchive-table tr td:nth-child(3)');
    driver.each((i: number, element: Element) =>{
      console.log(i, $(element).text());
      driverGrid.push(parseInt($(element).text()));

    })
        
    console.log(driverGrid);
  

    const  responseR: AxiosResponse  =   await axios.get(resultsUrl);
         
    $ = cheerio.load(responseR.data);
    const driverR = $('.resultsarchive-table tr td:nth-child(3)');
    driverR.each((i:number, element: Element) =>{
      console.log(i, $(element).text());
      driverResult.push(parseInt($(element).text()));

    })
  
    console.log(driverResult);

    gained = driverGrid.map((grid, i) => i - driverResult.indexOf(grid));
    console.log(gained);

       
    return ({drivers:driverGrid, gained:gained});

  } catch(error){console.log(error)}
   
    
}

