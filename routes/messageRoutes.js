import { Router } from 'express';

const router = Router();

router.post('/schedule', postScheduledMessage);

export default router;