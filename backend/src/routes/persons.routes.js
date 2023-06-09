import express from 'express';
import { personsController } from '../controllers';

const cors = require('cors');

//import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';

const router = express.Router();

router.use(cors());
router.use(express.json());
//router.use(verifyLocalSystem);

router.put('/', personsController.save_Person);
router.get('/', personsController.read_Persons);
router.delete('/', personsController.delete_Person);
export default router;
