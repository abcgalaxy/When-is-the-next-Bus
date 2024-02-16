const express = require('express');
const {google} = require('googleapis');
const { connectors } = require('googleapis/build/src/apis/connectors');

const app = express();

//converting data into json format
function converter (list){
    let titles = list[0];
    let res = [];
    for(let i=1; i<list.length; i++){
        let temp = {};
        for(let j=0; j<list[i].length; j++){
            temp[titles[j]]=list[i][j];
        }
        res.push(temp);
    }
    console.log(res);
}

//getting current date and time
function getdate(){
    
    let currentDate = new Date();

    // Get the current date
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Months are zero-indexed, so January is 0
    let year = currentDate.getFullYear();

    // Get the current time
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    // Formatting the date and time if needed
    let formattedDate = `${day}-${month}-${year}`;
    let formattedTime = `${hours}:${minutes}:${seconds}`;

    // Display the current date and time
    console.log("Current Date:", formattedDate);
    console.log("Current Time:", formattedTime);

}

//handling the get request
app.get('/', async (req,res)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile:"credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await  auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1Fufge7HlA0AEf37KRq7Bm7NdA2W9X0nzkK4ylTGEZsY";

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
      });

    const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
    });  

    //console.log(getRows.data.values);

    converter(getRows.data.values);
    //console.log(`${new Date}`)
    getdate();
    
    res.send("hello from sandeep");
})

//creating and listening to the server
app.listen(8000,()=>{
    console.log("server is on air");
})