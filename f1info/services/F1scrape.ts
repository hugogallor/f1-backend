//const axios = require('axios').default;

import axios, { AxiosResponse } from "axios";

const cheerio = require('cheerio');
//console.log("hey")
let gridUrl ="https://www.formula1.com/en/results/2024/races/1244/italy/starting-grid";
let resultsUrl ="https://www.formula1.com/en/results/2024/races/1244/italy/race-result";
//addPositionsGained();

export async function getPositionsGained(gridUrl:string, resultsUrl:string){
    const driverGrid:number[] = [];
    const driverResult:number[] = [];
    let gained:number[]  =[];
   try{ 
    const response: AxiosResponse = await axios.get(gridUrl);
    //console.log("response", response);
    let $ = cheerio.load(response.data);
    //console.log(data);
  
    //const driver = $('.resultsarchive-table tr td:nth-child(3)');
    const driver = $('.f1-table tr td:nth-child(2)');
    //console.log(driver)
    driver.each((i: number, element: Element) =>{
      //console.log(i, $(element).text());
      driverGrid.push(parseInt($(element).text()));

    })
        
   // console.log(driverGrid);
  

    const  responseR: AxiosResponse  =   await axios.get(resultsUrl);
         
    $ = cheerio.load(responseR.data);
    const driverR = $('.f1-table tr td:nth-child(2)');
    driverR.each((i:number, element: Element) =>{
      //console.log(i, $(element).text());
      driverResult.push(parseInt($(element).text()));

    })
  
   //console.log(driverResult);

    gained = driverGrid.map((grid, i) => i - driverResult.indexOf(grid));
    //console.log("gained");
    //console.log(gained);

       
    return ({drivers:driverGrid, gained:gained});

  } catch(error){console.log(error)}
   
    
}

async function addPositionsGained(){
  let res = await getPositionsGained(gridUrl, resultsUrl);
  return res;
}


