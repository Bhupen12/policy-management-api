import { Router } from 'express';
import { postScheduledMessage } from '../controllers/messageController.js';

const router = Router();

router.post('/schedule', postScheduledMessage);

export default router;