import OrderService from '../../services/order.service.js';
import utils from "../../helper/utils.js";

export default async function getOrders(req, res, next) {
    try {
        const orders = await OrderService.getAllOrders();
        return utils.returnHttpSuccessResponse(res, orders);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
