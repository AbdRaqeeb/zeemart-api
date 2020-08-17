import { Router } from 'express';
import OrderController from "../controllers/OrderController";

const router = Router();
const { makeOrder, getCustomerOrders, getOneOrder, getOrders, changeOrderStatus } = OrderController;

router.post('/', makeOrder);
router.get('/', getOrders);
router.get('/:id', getOneOrder);
router.get('/user', getCustomerOrders);
router.put('/', changeOrderStatus);

export default router;