import express from 'express';
import ProductCtrl from '../controllers/product/index.js';
import authenticationCtrl from '../server/authenticationCtrl.js';
const router = express.Router();

router.get('/products/list', [authenticationCtrl], async (req, res, next) => ProductCtrl.getProducts(req, res, next));
router.get('/products/:id', [authenticationCtrl], async (req, res, next) => ProductCtrl.getProductById(req, res, next));
router.post('/products', [authenticationCtrl], async (req, res, next) => ProductCtrl.createProduct(req, res, next));
router.put('/products/:id', [authenticationCtrl], async (req, res, next) => ProductCtrl.updateProduct(req, res, next));
router.delete('/products/:id', [authenticationCtrl], async (req, res, next) => ProductCtrl.deleteProduct(req, res, next));

export default router;
