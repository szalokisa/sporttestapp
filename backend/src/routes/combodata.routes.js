import express from 'express';
import { combodataController } from '../controllers';

const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(express.json());

router.put('/', combodataController.getcombodata);

export default router;
