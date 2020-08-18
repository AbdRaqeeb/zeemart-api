import { Order, OrderDetails, Payment } from '../../../database/models';
import db from '../../../database/models/index';
import { validateOrder } from '../../../middleware/Validate';
import { generateReference } from '../../../helpers/generator';

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
                const result = await db.sequelize.transaction(async t => {
                    const order = await Order.create({
                        amount: data.amount,
                        reference: await generateReference(6),
                        address: data.address,
                        customer_id: req.user.id,
                        user_id: req.user.id,
                        phone: data.phone,
                        type: data.type,
                        comments: data.comments
                    }, { transaction: t});

                    const payment = await Payment.create({
                        type: order.type,
                        amount: order.amount,
                        order_id: order.order_id
                    }, { transaction: t });

                    const newOrderDetail = await orderDetails.map(detail => ({
                        ...detail,
                        order_id: order.order_id
                    }));

                    await OrderDetails.bulkCreate(newOrderDetail, { transaction: t, validate: true });

                    return {
                        order,
                        payment
                    }
                });
                return res.status(200).json({
                    error: false,
                    result
                })
        } catch (e) {
            console.error(e);
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
                    limit,
                    offset,
                include: Payment
            });

            if (data.length === 0) return res.status(404).json({
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
                include: OrderDetails
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
        const { page, size } = req.query;

        const { limit, offset } = getPagination(page, size);

        try {
            const data = await Order.findAndCountAll({
                limit,
                offset,
                where: {
                    user_id: req.user.id
                }
            });

            if (data.length === 0) return res.status(404).json({
                error: true,
                msg: 'No orders for user'
            });

            const orders = getPagingData(data, page, limit);

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

    /**
     *@static
     * @desc  Change shipping date
     * @param {object} req express req object
     * @param {object} res express res object
     * @returns {json} json Order object
     **/
    static async changeShippingDate(req, res) {
        const { order_id, shipped_on } = req.body;
        try {
            const order = await Order.findByPk(order_id);
            if (!order) return res.status(404).json({
                error: true,
                msg: 'Order not found'
            });

            const updatedOrder = await order.update({ shipped_on });
            if (!updatedOrder) return res.status(404).json({
                error: true,
                msg: 'Error occurred'
            });

            return res.status(200).json({
                error: false,
                updatedOrder,
                msg: 'Shipping date updated'
            })
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Internal server error... ')
        }
    }
}

export default OrderController;