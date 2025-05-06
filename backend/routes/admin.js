const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_PASSWORD = "myadmin";

adminRouter.post("/singnup", async (req, res) => {
  const requredbody = z.object({
    email: z.string(),
    password: z.string(),
    fName: z.string(),
    lName: z.string(),
  });

  const parsedData = requredbody.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Format",
    });
  }

  const { email, password, fName, lName } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      email: email,
      password: hashedpassword,
      fName: fName,
      lName: lName,
    });
    return res.json({
      message: "admin signup succeeded",
    });
  } catch (e) {
    return res.json({
      message: "admin already exits",
    });
  }
});

adminRouter.post("/singnin", async (req, res) => {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.status(403).json({
      message: " Admin Not Exits in DB",
    });
    return;
  }

  const passMatch = await bcrypt.compare(password, admin.password);

  if (passMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );
    res.json({ token });
  } else {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }
});

adminRouter.post("/course", (req, res) => {});

adminRouter.put("/course", (req, res) => {});

adminRouter.get("/bulk", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
