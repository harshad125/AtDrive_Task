import Order from '../models/order.mongo.js';

class OrderRepository {
    async getAll() {
        return await Order.find().populate('items.productId');
    }

    async getById(id) {
        return await Order.findById(id).populate('items.productId');
    }

    async getByUserId(userId) {
        return await Order.find({ userId }).populate('items.productId');
    }

    async create(orderData) {
        return await Order.create(orderData);
    }

    async update(id, orderData) {
        return await Order.findByIdAndUpdate(id, orderData, { new: true }).populate('items.productId');
    }

    async delete(id) {
        return await Order.findByIdAndDelete(id);
    }
}

export default new OrderRepository();
