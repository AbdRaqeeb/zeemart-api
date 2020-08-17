import { Router } from 'express';
import OrderController from "../controllers/OrderController"
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { makeOrder, getCustomerOrders, getOneOrder, getOrders, changeOrderStatus } = OrderController;

router.post('/', verify, makeOrder);
router.get('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], getOrders);
router.get('/:id', verify, getOneOrder);
router.get('/user', verify, getCustomerOrders);
router.put('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], changeOrderStatus);

export default router;