import { Router } from 'express';
import OrderController from "../controllers/OrderController"
import {authorize} from '../../../middleware/authorize';
import verify from '../../../middleware/verify';
import Roles from '../../../helpers/roles';

const router = Router();
const { makeOrder, getCustomerOrders, getOneOrder, getOrders, changeOrderStatus, changeShippingDate } = OrderController;

router.post('/', verify, makeOrder);
router.get('/user', verify, getCustomerOrders);
router.get('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], getOrders);
router.get('/:id', verify, getOneOrder);
router.put('/', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], changeOrderStatus);
router.put('/date', [verify, authorize([Roles.SuperAdmin, Roles.Admin])], changeShippingDate);

export default router;