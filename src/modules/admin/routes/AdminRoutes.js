import { Router } from 'express';
import AdminController from "../controllers/AdminController";
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { registerAdmin, updateAdmin, updateAdminStatus, login, loggedIn, getAdmins, deleteAdmin, updatePassword } = AdminController;

router.post('/', registerAdmin);
router.get('/', verify, loggedIn);
router.get('/all', [verify, authorize(Roles.SuperAdmin)], getAdmins);
router.post('/login', login);
router.put('/', verify, updateAdmin);
router.put('/password', verify, updatePassword);
router.put('/status', [verify, authorize(Roles.SuperAdmin)], updateAdminStatus);
router.delete('/:id', [verify, authorize(Roles.SuperAdmin)], deleteAdmin);
export default router;