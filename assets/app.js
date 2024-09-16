const express = require('express');
const app = express();
const https = require('https');
const port = 8080; // Choose an available port
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public/uploads'));

app.get('/', (req, res) => {
  res.send('')
})

// Initialize Multer for image uploads
const storage = multer.diskStorage({
  destination: 'public/uploads', // Define the destination folder
  filename: (req, file, callback) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Define an endpoint for image uploads
app.post('/upload/:path', upload.single('image'), (req, res) => {
  const path = req.params.path;
  if (!req.file) {
    return res.status(400).json({ status: false, fileName: "" });
  }
  //Move the img in the path
  const imagePath = `${path}/${req.file.filename}`
  const fullPath = `public/uploads/${path}/${req.file.filename}`;
  fs.renameSync(req.file.path, fullPath);

  const fileName = req.file.filename;
  return res.json({ status: true, fileName: imagePath });
});

// Define a route to delete an image by its name
app.delete('/images/:path/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  var path = req.params.path;
  const imagePath = `public/uploads/${path}/${imageName}`;
  console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    // Delete the image file
    fs.unlinkSync(imagePath);
    res.json({ message: 'Image deleted successfully' });
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
});

const privateKey = fs.readFileSync('./credentials/test-privateKey.key', 'utf8');
const certificate = fs.readFileSync('./credentials/test.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

// Start the server
server.listen(port, () => {
  console.log(`Image server is running on https://localhost:${port}`);
});
