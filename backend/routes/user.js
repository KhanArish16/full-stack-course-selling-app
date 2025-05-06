const { Router } = require("express");
const { userModel } = require("../db");
const z = require("zod");
const bcrypt = require("bcrypt");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

userRouter.post("/singnup", async (req, res) => {
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
    await userModel.create({
      email: email,
      password: hashedpassword,
      fName: fName,
      lName: lName,
    });
    return res.json({
      message: "signup succeeded",
    });
  } catch (e) {
    return res.json({
      message: "user already exits",
    });
  }
});

userRouter.post("/singnin", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (!user) {
    res.status(403).json({
      message: " User Not Exits in DB",
    });
    return;
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (passMatch) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({ token });
  } else {
    res.status(403).json({
      message: "incorrect credentials",
    });
  }
});

userRouter.get("/purchases", (req, res) => {});

module.exports = {
  userRouter: userRouter,
};
