const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { UserDataOfWater } = require('./constants/allowedUpdates')
const serverResponse = require('./utils/serverResponse');
const app = express();

// require("dotenv").config();

app.use(express.json());
app.use(express.static("client/build"))
app.use(cors())

// models

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, default: 30 },
    weight: { type: Number, default: 70 },
    height: { type: Number, default: 170 },
    gender: { type: String, enum: ["MALE", "FEMALE"], default: "MALE" },
    waterInfo: {
        amountOfWaterDrank: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: new Date() }
    }
})

const User = mongoose.model("User", userSchema)

// routes

app.post("/api/user", async (req, res) => {
    try {
        const newUser = new User({ ...req.body })
        await newUser.save()
        return serverResponse(res, 200, newUser);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const existUser = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!existUser) {
            return serverResponse(res, 404, { message: "user not found" });
        }
        return serverResponse(res, 200, existUser);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})


app.get("/api/users", async (req, res) => {
    try {
        const allUsers = await User.find({})
        return serverResponse(res, 200, allUsers);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})

app.get("/api/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOne({ _id: userId });
        return serverResponse(res, 200, user);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})

app.delete("/api/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findOneAndDelete({ _id: userId });
        return serverResponse(res, 200, user);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})

app.put("/api/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const updates = Object.keys(req.body);
        const user = await User.findOne({ _id: userId });
        updates.forEach((update) => (user[update] = req.body[update]))
        user.save();
        return serverResponse(res, 200, user);
    } catch (e) {
        return serverResponse(res, 500, { message: "internal error occured" + e });
    }
})

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
})

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(8004, () => {
    console.log("listening on port 8004...");
})
