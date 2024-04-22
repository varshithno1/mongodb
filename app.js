const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs');
const Users = require("./src/schemas/usersSchema");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGOOSE);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
    try{
        const data = fs.readFileSync("src/pages/index.html", "utf-8");
        res.end(data);
    }catch(err){
        
        console.log("ERROR!!!: ", err);
        res.end("See console.");
    }
})

app.get("/allU", async (req, res) => {
    // const campgrounds = await Campground.find({});
    // res.render("campgrounds/index", { campgrounds });
    const users = await Users.find({});
    console.log(users);
    res.end("Retrived");
})

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})