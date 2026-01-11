import { Router } from 'express';
import policyRoutes from "./policyRoutes.js";
import messageRoutes from "./messageRoutes.js";

const router = Router();

router.get('/users', (req, res) => {
  return res.status(200).json({
    users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
  })
});

router.use('/policies', policyRoutes);

router.use('/message', messageRoutes)


export default router;