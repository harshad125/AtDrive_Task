import createOrder from './createOrder.js';
import getOrders from './getOrders.js';
import getOrderById from './getOrderById.js';
import updateOrder from './updateOrder.js';
import deleteOrder from './deleteOrder.js';

class OrderCtrl {
    static createOrder = createOrder;
    static getOrders = getOrders;
    static getOrderById = getOrderById;
    static updateOrder = updateOrder;
    static deleteOrder = deleteOrder;
}

export default OrderCtrl;
