const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = " qwerty";
const app = express();
app.use(express.json());

app.post("/user/singnup", (req, res) => {});

app.post("/user/singnin", (req, res) => {});

app.get("/user/purchases", (req, res) => {});

app.post("/course/purchase", (req, res) => {});

app.get("/courses", (req, res) => {});

app.listen(3000);
