import express from 'express';
import { organisationsController } from '../controllers';

const cors = require('cors');

const router = express.Router();
router.use(cors());
router.use(express.json());

router.put('/', organisationsController.save_Organisation);
router.get('/', organisationsController.read_Organisation);
router.delete('/', organisationsController.delete_Organisation);
export default router;
