import { Router } from 'express';
import {  scheduleMessageController } from '../controllers/messageController.js';

const router = Router();

router.post('/schedule',  scheduleMessageController);

export default router;