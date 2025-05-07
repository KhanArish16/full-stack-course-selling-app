const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/singnup", async (req, res) => {
  const requredbody = z.object({
    email: z.string(),
    password: z.string(),
    fName: z.string(),
    lName: z.string(),
  });

  const parsedData = requredbody.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
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
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  try {
    const courses = await courseModel.find({
      creatorId: adminId,
    });

    return res.json({
      msg: "successfully get all admin courses",
      courses: courses,
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
