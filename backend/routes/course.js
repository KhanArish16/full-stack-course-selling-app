const { Router } = require("express");
const { userRouter } = require("./user");

const courseRouter = Router();

courseRouter.post("/course/purchase", (req, res) => {});

courseRouter.get("/courses", (req, res) => {});

module.exports = {
  courseRouter: courseRouter,
};
