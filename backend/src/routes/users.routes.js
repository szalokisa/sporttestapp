import express from 'express';
import { usersController } from '../controllers';

const cors = require('cors');

//import { verifyLocalSystem } from '../middlewares/verifyLocalSystem';

const router = express.Router();

router.use(cors());
router.use(express.json());
//router.use(verifyLocalSystem);

router.put('/', usersController.registerUser);
router.put('/login', usersController.login);

export default router;
