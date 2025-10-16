//const axios = require('axios').default;
// dejo de funcionar porque F1 cambió la pagina. 
//https://wanago.io/2025/02/17/cheerio-web-scraping/


import axios, { AxiosResponse } from "axios";

const cheerio = require('cheerio');
//console.log("hey")
let gridUrl ="https://www.formula1.com/en/results/2025/races/1270/singapore/starting-grid";
let resultsUrl ="https://www.formula1.com/en/results/2025/races/1270/singapore/race-result";
addPositionsGained();

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
    const driver = $('[id="results-table"]').find('tbody').find('tr');
    //console.log(driver)
    driver.each((i: number, element: Element) =>{
      const driverNumber = $(element).find('td');
      //console.log("DRiver number " + $(driverNumber[1]).text());
      //console.log(i, $(element).text());
      //driverGrid.push(parseInt($(element).text()));
      driverGrid.push(parseInt($(driverNumber[1]).text()));

    })
        
    //console.log(driverGrid);
  

    const  responseR: AxiosResponse  =   await axios.get(resultsUrl);
         
    $ = cheerio.load(responseR.data);
    //const driverR = $('.f1-table tr td:nth-child(2)');
    const driverR = $('[id="results-table"]').find('tbody').find('tr');
    driverR.each((i:number, element: Element) =>{
      //console.log(i, $(element).text());
      const driverNumber = $(element).find('td');
      driverResult.push(parseInt($(driverNumber[1]).text()));

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


