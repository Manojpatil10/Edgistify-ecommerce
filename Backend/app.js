const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const router = require('./routes/main-routes')
require('dotenv').config();

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,authorization");
    next();
})

// Multer Storage Setup
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, timestamp + "-" + file.originalname);
    }
});

app.use(multer({ storage: fileStorage }).single('profileImg'));

app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use(router);

const mongodb_url = process.env.MONGODB_URL;

// mongoose.connect(mongodb_url).then(() => {
//     console.log("Mongodb connected successfully");
// }).catch((err) => {
//     console.log("error in mongodb connection", err);
// })

mongoose.connect(`${process.env.ATLAS_URL}`).then((connected)=>{
  console.log("Mongodb connected successfully");
}).catch((err)=>{
  console.log("error in mongodb connection",err);
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})