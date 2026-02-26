import express from 'express';
import OrderCtrl from '../controllers/order/index.js';
import authenticationCtrl from '../server/authenticationCtrl.js';

const router = express.Router();

router.get('/order/list', [authenticationCtrl], async (req, res, next) => OrderCtrl.getOrders(req, res, next));
router.get('/order/:id', [authenticationCtrl], async (req, res, next) => OrderCtrl.getOrderById(req, res, next));
router.post('/order', [authenticationCtrl], async (req, res, next) => OrderCtrl.createOrder(req, res, next));
router.put('/order/:id', [authenticationCtrl], async (req, res, next) => OrderCtrl.updateOrder(req, res, next));
router.delete('/order/:id', [authenticationCtrl], async (req, res, next) => OrderCtrl.deleteOrder(req, res, next));

export default router;
