const mysql = require("mysql");

const db = mysql.createConnection({
    host: "party-resources.crurrv9mzw4i.us-west-1.rds.amazonaws.com",
    port: "3306",
    user: "cmvallat",
    password: "Gdtbath21!", //this is such a bad idea, change immediately
    db: "Party"
});

db.connect((err) => {
    if(err)
    {
        console.log(err.message);
        return;
    }
    console.log("db connected.");
})

var useCorrectDBQuery = "use Party";
var insertTestHostValue = "INSERT INTO Host (party_name, party_code, phone_number, spotify_device_id, invite_only) VALUES ('ChristianVParty', 'boobies', '1234', 'spotifyid', '1')";
var insertTestGuestValue = "INSERT INTO Guest (guest_name, party_code, at_party) VALUES ('ChristianV', 'boobies', '1')";

db.query(useCorrectDBQuery, function (err, result) {
    if (err) 
    {
        throw err;
    }
    console.log("Currently using Party database.");
});

db.query(insertTestHostValue, function (err, result) {
    if (err) 
    {
        throw err;
    }
    console.log("Values inserted into host: " + result);
});

db.query(insertTestGuestValue, function (err, result) {
    if (err) 
    {
        throw err;
    }
    console.log("Values inserted into Guest: " + result);
});

db.end();