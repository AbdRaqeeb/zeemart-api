import { Router } from 'express';
import CategoryController from "../controllers/CategoryController";

const router = Router();
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = CategoryController;

router.post('/', addCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;