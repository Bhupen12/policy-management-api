import { Router } from 'express';
import {  handlePolicyAggregation,  handlePolicySearch } from '../controllers/policyController.js';
import { upload,  handleUpload } from '../controllers/uploadController.js';

const router = Router();

router.post('/upload', upload.single('file'),  handleUpload);

router.get('/search',  handlePolicySearch);

router.get('/aggregate',  handlePolicyAggregation);

export default router;