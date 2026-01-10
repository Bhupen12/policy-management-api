import { Router } from 'express';
import { upload, uploadFile } from './upload.js';
import { searchPolicies } from './policyController.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/policies/search', searchPolicies);

router.get('/users', (req, res) => {
  return res.status(200).json({
    users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
  })
})

export default router;