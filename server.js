const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const JobSeeker = require('./models/JobSeeker'); // Import the JobSeeker model

const app = express();

// MongoDB connection string
const mongoURI = 'mongodb+srv://yashashvi:Gauri1305%40@cluster0.imfve.mongodb.net/YourHR?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Specify the directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Use a unique name for the file
  }
});

const upload = multer({ storage: storage });

// Handle form submission
app.post('/submit', upload.single('resume'), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      linkedin,
      skills,
      experience,
      location,
      jobType,
      coverLetter
    } = req.body;
    const resume = req.file.filename;

    // Create a new job seeker document
    const newJobSeeker = new JobSeeker({
      name,
      email,
      phone,
      linkedin,
      skills,
      experience,
      location,
      jobType,
      coverLetter,
      resume
    });

    // Save the document to MongoDB
    await newJobSeeker.save();

    console.log(`Name: ${name}, Email: ${email}, Phone: ${phone}, LinkedIn: ${linkedin}, Skills: ${skills}, Experience: ${experience}, Location: ${location}, Job Type: ${jobType}, Cover Letter: ${coverLetter}, Resume: ${resume}`);
    
    // Redirect to the thank you page
    res.redirect('/thankyou.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



