import axios from "axios";
import fs from 'fs';
import File from '../Model/file.js';
import { upload } from '../config/multer.config.js';
import bucket from "../config/firebaseConfig.mjs";


export const uploadFiles = [upload.single('file'), async (req, res) => {
  const file = req.file;  
  const { fileName, subject, gradeLevel } = req.body;
    try {

      if (
        !file ||
        !fileName ||
        !subject ||
        !gradeLevel
      ) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      // Check if the file is a PDF
      if (!file || file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Only PDF files are allowed' });
      }
  
      const firebasePath = `pdfs/${file.originalname}`;
  
      // Upload to Firebase
      await bucket.upload(file.path, {
        destination: firebasePath,
        metadata: {
          contentType: 'application/pdf',
        },
      });
  
      // Delete local file
      fs.unlinkSync(file.path);
  
      // Get signed URL
      const [url] = await bucket.file(firebasePath).getSignedUrl({
        action: 'read',
        expires: '03-01-2026',
      });
  
      // Save metadata to MongoDB
      const savedFile = new File({
        originalName: file.originalname,
        fileName,
        subject,
        gradeLevel,
        firebasePath,
        downloadURL: url,
      });
  
      await savedFile.save();
  
      return res.status(201).json({
        message: 'Uploaded and saved',
        file: savedFile,
        fileName: file.fileName,
        subject: file.subject,
        gradeLevel: file.gradeLevel,
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: ' Upload failed' });
    }
  }];

  // get the list of saves files 
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 }); // Get latest files first

    if (!files || files.length === 0) {
      return res.status(404).json({ message: 'No files found.' });
    }

    // Format files for frontend
    const formattedFiles = files.map(file => ({
      id: file._id,
      originalName: file.originalName,
      subject: file.subject,
      gradeLevel: file.gradeLevel,
      downloadURL: file.downloadURL,
      uploadedAt: file.uploadedAt,
      uploadedBy: file.uploadedBy, 
    }));

    res.status(200).json({
      message: 'Files retrieved successfully',
      files: formattedFiles,
    });
  } catch (err) {
    console.error('Error fetching files:', err.message);
    res.status(500).json({
      message: 'Unable to retrieve files',
      error: err.message,
    });
  }
};


export const downloadFiles = async (req, res) => {
    const fileName = req.params.name;
  
    try {
      // Step 1: Find file in MongoDB
      const file = await File.findOne({ originalName: fileName });
      if (!file) {
        return res.status(404).json({ message: 'File not found' });
      }
  
      const fileUrl = file.downloadURL;
  
      // Step 2: Fetch the file stream from Firebase Storage
      const fileResponse = await axios.get(fileUrl, {
        responseType: 'stream',
      });
  
      // Step 3: Set headers to force download
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', fileResponse.headers['content-type']);
  
      // Step 4: Pipe the Firebase file stream to client
      fileResponse.data.pipe(res);
    } catch (error) {
      console.error('Download error:', error.message);
      return res.status(500).json({ message: 'Download failed' });
    }
  };
  