import { Router } from 'express';
import { createArduino, getArduinos, getArduinoById, updateArduinoById, deleteArduinoById } from '../controllers/ArduinoController';

const router = Router();

router.get('/register/:name', createArduino);
router.get('/getarduinos', getArduinos);
router.get('/getarduino/:id', getArduinoById);
router.put('/update/:id', updateArduinoById);
router.delete('/delete/:id', deleteArduinoById);

export default router;