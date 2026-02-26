import OrderService from '../../services/order.service.js';
import utils from "../../helper/utils.js";

export default async function createOrder(req, res, next) {
    try {
        const { items, totalAmount } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: 'Items array is required' });
        }

        // Structure the order data
        const orderData = {
            userId: req.user.id, // From authentication middleware
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            totalAmount: totalAmount
        };

        const order = await OrderService.createOrder(orderData);
        return utils.returnHttpSuccessResponse(res, order);
    } catch (error) {
        console.error('Order Creation Error:', error);
        return next(error);
    }
}
