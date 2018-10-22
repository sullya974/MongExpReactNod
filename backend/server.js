const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

//This our MongoDb database
const dbRoute = "mongodb://XXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

//Connects backend code to database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

//Check if connection with database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Optional, only made for logging and
// bodyParser, parses the request body to be readable json format
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(logger("dev"));

//Our GET method
//Fetches all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if(err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});


//Our update method
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if(err) return res.json({success:false, error:err});
        return res.json({ success: true });
    });
});

//Delete method
//Remove data from database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(err, err => {
        if(err) return res.send(err);
        return res.json({ success: true });
    });
});

//Create  method
//Remove data from database
router.post("/putData", (req, res) => {
    let data = new Data();
    const { id, message } = req.body;

    if(!id && id !== 0 || !message){
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if(err) return res.json({success:false, error:err});
        return res.json({ success: true });
    });
});

//append API for our HTTP requests
app.use("/api", router);

//Launch our backend into a port
app.listen(API_PORT, console.log(`LISTEN ON PORT ${API_PORT}`));