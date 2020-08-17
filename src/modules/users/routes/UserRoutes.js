import { Router } from 'express';
import UserController from '../controllers/UserController';
import verify from "../../../middleware/verify";

const { register, loggedIn, login, update } = UserController;

const router = Router();

router.post('/', register); // register user
router.get('/', verify, loggedIn);  // get logged in user
router.post('/login', login);  // login user
router.put('/', verify, update); // Update user profile

export default router;