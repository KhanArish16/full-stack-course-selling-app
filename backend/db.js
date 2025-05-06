const { Schema, default: mongoose } = require("mongoose");
const objectId = Schema.ObjectId;
mongoose.connect(
  "mongodb+srv://mohdarish8482:babbanbillo8482@learning-cluster1.91lka6y.mongodb.net/course-selling-app"
);

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  createrId: objectId,
});

const purchaseSchema = new Schema({
  courseId: objectId,
  userId: objectId,
});

const userModel = mongoose.model("user", userSchema);

const adminModel = mongoose.model("admin", adminSchema);

const courseModel = mongoose.model("course", courseSchema);

const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = { userModel, adminModel, courseModel, purchaseModel };
