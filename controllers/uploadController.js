import { Worker } from 'worker_threads';

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

import { saveRows } from '../services/uploadService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ storage: multer.memoryStorage() });

const uploadFile = async (req, res) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const buffer = req.file.buffer;
    const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

    const workerPath = path.join(__dirname, '..', 'workers', 'uploadParserWorker.js');
    const worker = new Worker(workerPath);

    const msg = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        worker.terminate().catch(() => { });
        reject(new Error("Worker Timeout"));
      }, 60_000);

      worker.on('message', (message) => {
        clearTimeout(timeout);
        resolve(message);
      });

      worker.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });

      worker.postMessage({ arrayBuffer, filename: req.file.originalname });
    });

    if (!msg || !msg.success) {
      if (worker) {
        await worker.terminate().catch(() => { });
      }
      const err = msg && msg.error ? msg.error : 'Unknown error';
      return res.status(500).json({
        success: false,
        error: err,
      });
    }

    const rows = msg.rows || [];
    await saveRows(rows);

    try {
      await worker.terminate();
    } catch { }

    return res.status(200).json({
      success: true,
      insertedRows: rows.length,
      message: 'File uploaded successfully.',
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json(
      {
        success: false,
        error: error.message ?? String(error),
      }
    );
  }
};

export { upload, uploadFile };
