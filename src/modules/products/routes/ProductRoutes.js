import { Router } from 'express';
import ProductController from "../controllers/ProductController";
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { addProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = ProductController;

router.post('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], addProduct);
router.get('/', getProducts);
router.get('/:id', getOneProduct);
router.put('/:id', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], updateProduct);
router.delete('/:id', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], deleteProduct);

export default router;