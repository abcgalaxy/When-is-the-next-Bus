const express = require('express');
const {google} = require('googleapis');

const app = express();

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

    console.log(getRows.data.values);
    
    res.send("hello from sandeep");
})

app.listen(8000,()=>{
    console.log("server is on air");
})