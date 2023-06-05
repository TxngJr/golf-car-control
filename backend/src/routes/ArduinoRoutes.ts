import express from 'express';
import { createArduino, getArduino, getArduinoById, updateArduinoById, deleteArduinoById, } from '../controllers/ArduinoController';

const router = express.Router();

router.get('/register', createArduino);
router.get('/', getArduino);
router.get('/:id', getArduinoById);
router.put('/:id', updateArduinoById);
router.delete('/:id', deleteArduinoById);

export default router;
