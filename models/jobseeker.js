const mongoose = require('mongoose');

// Define a schema for job seekers
const jobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  linkedin: {
    type: String
  },
  skills: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'remote'],
    required: true
  },
  coverLetter: {
    type: String
  },
  resume: {
    type: String,
    required: true
  }
});

// Create a model from the schema
const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

module.exports = JobSeeker;


