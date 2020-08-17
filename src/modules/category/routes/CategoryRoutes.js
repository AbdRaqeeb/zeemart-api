import { Router } from 'express';
import CategoryController from "../controllers/CategoryController";
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';


const router = Router();
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = CategoryController;

router.post('/', [verify, authorize([Roles.Admin, Roles.SuperAdmin])], addCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', [verify, authorize([Roles.Admin, Roles.SuperAdmin])], updateCategory);
router.delete('/:id', [verify, authorize([Roles.Admin, Roles.SuperAdmin])], deleteCategory);

export default router;