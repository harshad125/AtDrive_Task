import OrderService from '../../services/order.service.js';
import utils from "../../helper/utils.js";
import * as userError from '../../helper/userError.js';

export default async function getOrderById(req, res, next) {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        if (!order) {
            return next(new userError.NotFoundError(null, 'Order not found'));
        }
        return utils.returnHttpSuccessResponse(res, order);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
