import OrderService from '../../services/order.service.js';
import utils from "../../helper/utils.js";
import * as userError from '../../helper/userError.js';

export default async function updateOrder(req, res, next) {
    try {
        const order = await OrderService.updateOrder(req.params.id, req.body);
        if (!order) {
            return next(new userError.NotFoundError(null, 'Order not found'));
        }
        return utils.returnHttpSuccessResponse(res, order);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
