import multer from 'multer';
import { processUpload } from '../services/uploadService.js';

const upload = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    await processUpload(req.file.buffer);
    res.send('File uploaded and processed successfully.');
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).send('Error processing file.');
  }
};

export { upload, uploadFile };
