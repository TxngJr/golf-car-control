import express from 'express';
import { recordStartEndTime, getRecords, } from '../controllers/RecordController';

const router = express.Router();

router.post('/:arduinoId',recordStartEndTime);
router.get('/',recordStartEndTime);

export default router;