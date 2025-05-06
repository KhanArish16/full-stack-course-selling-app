const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { Model } = require("mongoose");
const { adminModel } = require("../db");
adminRouter.post("/singnup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string(),
    password: z.number(),
    fName: z.string(),
    lName: z.string(),
  });

  const parseData = requiredBody.safeParse(req.body);

  if (!parseData) {
    res.json({
      msg: "incorrect format",
    });
  }

  const { email, password, fName, lName } = req.body;

  try {
    const hashedpass = bcrypt.hash(password, 5);

    await adminModel.create({
      email,
      password,
      fName,
      lName,
    });
  } catch (error) {
    res.json({
      message: "user already exits",
    });
  }

  res.json({
    message: "signup",
  });
});

adminRouter.post("/singnin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
});

adminRouter.post("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/bulk", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
