const express = require('express');
const app = express();
const https = require('https');
const port = 8080;
const cors = require("cors");
const multer = require('multer');
const fs = require('fs');

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public/uploads'));

// Initialize Multer with dynamic destination for both images and videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = req.params.path;
    
    // Dynamically set the destination folder based on the path
    let folder = 'public/uploads';
    if (path === 'posters') {
      folder += '/images';
    } else if (path === 'episodeVideos') {
      folder += '/episodeVideos';
    }
    
    // Ensure the directory exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Define a generic upload endpoint for both images and videos
app.post('/upload/:path', upload.single('file'), (req, res) => {
  const path = req.params.path;
  if (!req.file) {
    return res.status(400).json({ status: false, fileName: "" });
  }
  
  // Construct the correct file path
  const filePath = `${path}/${req.file.filename}`;
  const fullPath = `public/uploads/${path}/${req.file.filename}`;
  fs.renameSync(req.file.path, fullPath);

  return res.json({ status: true, fileName: filePath });
});

// Define a route to delete a file by its name
app.delete('/files/:path/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const path = req.params.path;
  const filePath = `public/uploads/${path}/${fileName}`;
  
  if (fs.existsSync(filePath)) {
    // Delete the file
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted successfully' });
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

const privateKey = fs.readFileSync('./credentials/test-privateKey.key', 'utf8');
const certificate = fs.readFileSync('./credentials/test.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
