import { Router } from 'express';
import UserController from '../controllers/UserController';
import AdminController from '../controllers/AdminController';

const { register, loggedIn, login, update } = UserController;
const { registerAdmin } = AdminController;

const router = Router();

router.post('/', register); // register user
router.post('/admin', registerAdmin); // register admin
router.get('/', loggedIn);  // get logged in user
router.post('/auth', login);  // login user
router.put('/', update); // Update user profile

export default router;