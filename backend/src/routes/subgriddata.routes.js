import express from 'express';
import { subgriddataController } from '../controllers';

const cors = require('cors');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/', subgriddataController.getsubgriddata);

export default router;
