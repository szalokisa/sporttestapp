import express from 'express';
import TokenController from '../controllers/TokenController';
import { verifyLoginToken } from '../middlewares/verifyToken';

const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/', TokenController.login);
router.put('/', verifyLoginToken, TokenController.extendToken);
export default router;
