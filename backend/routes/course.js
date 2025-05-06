const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({
    msg: "courses purchase",
  });
});

courseRouter.get("/preview", (req, res) => {
  res.json({
    msg: "courses preview",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
