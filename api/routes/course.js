const express = require("express");
const router = express.Router();

const User = require("./../models/User");
const Course = require("./../models/Course");

router.post("/new_course", async (req, res) => {
  const { userId, name, code, description } = req.body;
  if (!req.user) return res.json({ message: "Needs auth", code: 401 });
  if (!name || !code)
    return res.json({ message: "Missing fields: [code, name]", code: 403 });

  // check if user is teacher
  const teacher = await User.findOne({ _id: userId });

  if (teacher && teacher.role !== 1) {
    return res.json({ message: "User has to be a teacher", code: 401 });
  }

  const newCourse = new Course({ name, code, description });
  try {
    if (newCourse) {
      await User.updateMany(
        { _id: teacher._id },
        { $addToSet: { courseID: newCourse._id } }
      );
    }
  } catch (error) {}
  if (newCourse) {
    newCourse
      .save()
      .then((doc) => {
        return res.json({
          message: "Course saved successfully",
          data: doc,
          code: 200,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Something went wrong",
          data: err,
          code: 400,
        });
      });
  }
});

// we map all user courseIDs
// we get all course objects by courseIDs, which are attached to user object

router.get(`/teacher/:userId`, async (req, res) => {
  if (!req.user) return res.json({ message: "Needs auth", code: 401 });
  try {
    const user = await User.findById(req.params.userId);
    const courses = await Course.find({ _id: { $in: user.courseID } });
    return res.json({ data: courses, code: 200 });
  } catch (error) {
    return res.json({ error, code: 403 });
  }
});

router.get(`/student/:userId`, async (req, res) => {
  if (!req.user) return res.json({ message: "Needs auth", code: 401 });
  try {
    const user = await User.findById(req.params.userId);
    const courses = await Course.find({ _id: { $in: user.courseID } });
    return res.json({ data: courses, code: 200 });
  } catch (error) {
    return res.json({ error, code: 403 });
  }
});

module.exports = router;
