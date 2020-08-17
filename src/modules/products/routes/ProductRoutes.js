import { Router } from 'express';
import ProductController from "../controllers/ProductController";

const router = Router();
const { addProduct, getProducts, getOneProduct, updateProduct, deleteProduct } = ProductController;

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/:id', getOneProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;