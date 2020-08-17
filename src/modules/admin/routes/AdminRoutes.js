import { Router } from 'express';
import AdminController from "../controllers/AdminController";
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { registerAdmin, updateAdmin, updateAdminStatus, login, loggedIn } = AdminController;

router.post('/', registerAdmin);
router.get('/', verify, loggedIn);
router.post('/login', login);
router.put('/', verify, updateAdmin);
router.post('/status', [verify, authorize(Roles.SuperAdmin)], updateAdminStatus);

export default router;