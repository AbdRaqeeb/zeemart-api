import { Router } from 'express';
import UserController from '../controllers/UserController';
import verify from "../../../middleware/verify";
import {authorize} from "../../../middleware/authorize";
import Roles from "../../../helpers/roles";

const { register, loggedIn, login, update, getUsers } = UserController;

const router = Router();

router.post('/', register); // register user
router.get('/all', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], getUsers);
router.get('/', verify, loggedIn);  // get logged in user
router.post('/login', login);  // login user
router.put('/', verify, update); // Update user profile

export default router;