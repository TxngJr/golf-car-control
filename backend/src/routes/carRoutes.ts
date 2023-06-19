import { Router } from 'express';
import { createCar,getCarById,updateCarById, } from '../controllers/CarController';

const router = Router();

router.get('/register', createCar);
router.get('/getcar/:id', getCarById);
router.put('/update/:id', updateCarById);

export default router;