const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = " qwerty";
const app = express();
app.use(express.json());

app.post("./singnup", (req, res) => {});

app.post("./singnin", (req, res) => {});

app.post("./createCourse", (req, res) => {});

app.get("./deleteCourse", (req, res) => {});

app.get("./addContent", (req, res) => {});

app.listen(3000);
