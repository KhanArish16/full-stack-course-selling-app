const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config").default;
const adminMiddleware = require("../middleware/admin");

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      imageUrl,
      price,
      createrId: adminId,
    });

    return res.json({
      msg: "successfully Course Added",
      course: course._id,
    });
  } catch (e) {
    return res.status(403).json({
      msg: "Failed To Add Course",
    });
  }
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, price, courseId } = req.body;

  try {
    const course = await courseModel.updateOne(
      {
        _id: courseId,
        createrId: adminId,
      },
      {
        title,
        description,
        imageUrl,
        price,
      }
    );

    return res.json({
      msg: "successfully Course updated",
      course: course._id,
    });
  } catch (e) {
    return res.status(403).json({
      msg: "Failed To update Course",
    });
  }
});

adminRouter.get("/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.adminId;
  try {
    const courses = await courseModel.find({
      createrId: adminId,
    });

    return res.json({
      msg: "successfully get all admin courses",
      courses,
    });
  } catch (e) {
    return res.status(403).json({
      msg: "Failed To get courses",
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
