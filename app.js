const express = require("express");
const cors = require("cors");
const configs = require("./utils/config");

const router = require("./router");
const app = express();
// routers come here

const mongoose = require("mongoose");
mongoose.connect(configs.DB_URL)
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log("error connecting to MongoDB", err.message));

const http = require("http").createServer(app);

app.use(cors());
app.use(express.json());

app.use("/v1/configurations", router);
module.exports =  http;