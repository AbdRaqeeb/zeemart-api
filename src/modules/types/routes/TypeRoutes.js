import { Router } from 'express';
import TypeController from "../controllers/TypeController";

const { addType, getAllTypes, getOneType, deleteType, updateType } = TypeController;
const router = Router();

router.post('/', addType);
router.get('/', getAllTypes);
router.get('/:id', getOneType);
router.put('/:id', updateType);
router.delete('/:id', deleteType);

export default router;

