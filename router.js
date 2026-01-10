import { Router } from 'express';
import { upload, uploadFile } from './upload.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/users', (req, res) => {
  return res.status(200).json({
    users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
  })
})

export default router;