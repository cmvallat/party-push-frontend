// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

//FIGURE OUT HOW TO IMPORT DB CONNECTION ROM ANOTHER FILE
//SO WE DONT HAVE TO KEEP ALL OF THIS IN OUR API FILE 
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "party-resources.crurrv9mzw4i.us-west-1.rds.amazonaws.com",
    port: "3306",
    user: "cmvallat",
    password: "Gdtbath21!", //this is such a bad idea, change immediately
    db: "Party"
});

db.connect((err: { message: any; }) => {
    if(err)
    {
        console.log(err.message);
        return;
    }
    console.log("db connected.");
})

var useCorrectDBQuery = "use Party";
var insertTestHostValue = "INSERT INTO Host (party_name, party_code, phone_number, spotify_device_id, invite_only) VALUES ('ChristianVParty', 'testinginprod', '1234', 'spotifyid', '1')";
var insertTestGuestValue = "INSERT INTO Guest (guest_name, party_code, at_party) VALUES ('ChristianV', 'testinginprod', '1')";


type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.query(useCorrectDBQuery, function (err: any, result: any) {
    if (err) 
    {
        throw err;
    }
    console.log("Currently using Party database.");
});

db.query(insertTestHostValue, function (err: any, result: string) {
    if (err) 
    {
        throw err;
    }
    console.log("Values inserted into host: " + result);
});

db.query(insertTestGuestValue, function (err: any, result: string) {
    if (err) 
    {
        throw err;
    }
    console.log("Values inserted into Guest: " + result);
});

db.end();

  res.status(200).json({ name: 'James Doe' })
}
