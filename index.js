const express = require('express');
const mongoose = require('mongoose');
const settings = require('./settings');

const authRoutes = require("./routers/authRouter");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    try {
        res.status(200).json({message: "jwt example..."});
    } catch (e) {
        res.status(500).json({message: "server error"});
    }
})

async function start () {
    try {
        await mongoose.connect(settings.MONGO_URI);

        app.listen(settings.PORT, () => {
            console.log(`server started on port ${settings.PORT}`);
        });

    } catch (e) {
        console.log(e);
    }
}

start();