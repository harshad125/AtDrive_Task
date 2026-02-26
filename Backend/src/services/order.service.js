import OrderRepository from '../repositories/order.repository.js';

class OrderService {
    async getAllOrders() {
        return await OrderRepository.getAll();
    }

    async getOrderById(id) {
        return await OrderRepository.getById(id);
    }

    async getOrdersByUserId(userId) {
        return await OrderRepository.getByUserId(userId);
    }

    async createOrder(orderData) {
        // Generate a simple orderId if not provided
        if (!orderData.orderId) {
            orderData.orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        }
        return await OrderRepository.create(orderData);
    }

    async updateOrder(id, orderData) {
        return await OrderRepository.update(id, orderData);
    }

    async deleteOrder(id) {
        return await OrderRepository.delete(id);
    }
}

export default new OrderService();
