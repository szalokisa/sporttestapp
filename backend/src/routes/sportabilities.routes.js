import express from 'express';
import { sportabilitiesController } from '../controllers';

const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.put('/', sportabilitiesController.save_SportAbilities);
router.get('/', sportabilitiesController.read_SportAbilities);
router.delete('/', sportabilitiesController.delete_SportAbilities);
export default router;
