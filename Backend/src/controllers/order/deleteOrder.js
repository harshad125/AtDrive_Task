import OrderService from '../../services/order.service.js';
import utils from "../../helper/utils.js";
import * as userError from '../../helper/userError.js';

export default async function deleteOrder(req, res, next) {
    try {
        const order = await OrderService.deleteOrder(req.params.id);
        if (!order) {
            return next(new userError.NotFoundError(null, 'Order not found'));
        }
        return utils.returnHttpSuccessResponse(res, { message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
