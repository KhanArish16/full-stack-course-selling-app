const { Router } = require("express");

const userRouter = Router();
userRouter.post("/singnup", (req, res) => {
  res.json({
    message: "signup",
  });
});

userRouter.post("/singnin", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = {
  userRouter: userRouter,
};
