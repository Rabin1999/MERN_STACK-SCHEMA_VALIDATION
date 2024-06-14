const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Student = require('../models/Student');

// Validation schema
const studentValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  gender: Joi.string().required(),
  course: Joi.string().required(),
});

// @route POST /api/students
// @desc Register a new student
router.post('/', async (req, res) => {
  const { error } = studentValidationSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, gender, course } = req.body;

  try {
    const student = new Student({ name, email, password, gender, course });
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    console.error('Server error: ', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
