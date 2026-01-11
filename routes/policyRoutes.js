import { Router } from 'express';
import { searchPolicies } from '../controllers/policyController.js';
import { upload, uploadFile } from '../controllers/uploadController.js';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/search', searchPolicies);

export default router;