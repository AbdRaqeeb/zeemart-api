import { Router } from 'express';
import StatController from "../controllers/StatController";
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { userCount, adminCount } = StatController;

router.get('/users', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], userCount);
router.get('/admin', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], adminCount);

export default router;