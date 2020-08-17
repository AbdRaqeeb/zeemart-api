import { Order, OrderDetail, Payment } from '../../../database/models';
import db from '../../../database/models/index';
import { validateOrder } from '../../../middleware/Validate';
import {generatedReference} from '../../../helpers/generator';

import { getPagingData, getPagination } from '../../../middleware/Pagination';

/**
 *@class  Orders
 * @desc  Controllers for orders
 **/
class OrderController {
    /**
     *@static
     * @desc  Make an order
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async makeOrder(req, res) {
        const { error } = validateOrder(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const data = req.body;
        const orderDetails = data.data;

        try {
            try {
                const transaction = db.sequelize.transaction();
                const order = await Order.create({
                    amount: data.amount,
                    reference: generatedReference,
                    address: data.address,
                    customer_id: req.user.user_id,
                    phone: data.phone,
                    type: data.type
                }, { transaction });

                const payment = await Payment.create({
                    type: order.type,
                    amount: order.amount
                }, { transaction });

                const newOrderDetail = orderDetails.map(detail => ({
                    ...detail,
                    order_id: order.order_id
                }));

                await OrderDetail.bulkCreate(newOrderDetail, { transaction });
                await transaction.commit();

                return res.status(200).json({
                    error: false,
                    order,
                    payment
                })
            } catch  {
                transaction.rollback();
            }
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @desc  Get all orders
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async getOrders(req, res) {
        const { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        try {
            const data = await Order.findAndCountAll({
                where: {
                    limit,
                    offset
                },
                include: Payment
            });

            if (!data) return res.status(404).json({
                error: true,
                msg: 'No order found'
            });

            const count = data.count;

            const orders = getPagingData(data, page, limit);

            return res.status(200).json({
                error: false,
                orders,
                count
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @desc  Get one order
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async getOneOrder(req, res) {
        const { id } = req.params;
        try {
            const order = await Order.findByPk(id, {
                include: OrderDetail
            });

            if (!order) return res.status(404).json({
                error: true,
                msg: 'Order not found'
            });

            return res.status(200).json({
                error: false,
                order
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @desc  Get one customer orders
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async getCustomerOrders(req, res) {
        try {
            const orders = await Order.findAll({
                where: {
                    customer_id: req.user.user_id
                }
            });

            if (!orders) return res.status(404).json({
                error: true,
                msg: 'No orders for user'
            });

            return res.status(200).json({
                error: false,
                orders
            });
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error...')
        }
    }

    /**
     *@static
     * @desc  Change order status
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async changeOrderStatus(req, res) {
        const { status, order_id } = req.body;
        try {
            const order = await Order.findByPk(order_id);
            if (!order) return res.status(404).json({
                error: true,
                msg: 'Order not found'
            });

            const updatedOrder = await order.update({ status });
            if (!updatedOrder) return res.status(404).json({
                error: true,
                msg: 'Error occurred'
            });

            return res.status(200).json({
                error: false,
                updatedOrder,
                msg: 'Order status updated'
            })
        } catch (e) {
          console.error(e.message);
          res.status(500).send('Internal server error... ')
        }
    }
}

export default OrderController;