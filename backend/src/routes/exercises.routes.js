import express from 'express';
import { exercisesController } from '../controllers';

const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.put('/', exercisesController.save_Exercises);
router.get('/', exercisesController.read_Exercises);
router.delete('/', exercisesController.delete_Exercises);
router.put('/restoex', exercisesController.save_ResToEx);
export default router;
