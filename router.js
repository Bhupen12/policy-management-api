import { Router } from 'express';
import { upload, uploadFile } from "./controllers/uploadController.js";
import { searchPolicies } from "./controllers/policyController.js"

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);

router.get('/policies/search', searchPolicies);

router.get('/users', (req, res) => {
  return res.status(200).json({
    users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
  })
})

export default router;