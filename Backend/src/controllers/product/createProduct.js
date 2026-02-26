import ProductService from '../../services/product.service.js';
import utils from "../../helper/utils.js";

const productService = new ProductService('mongo');

export default async function createProduct(req, res, next) {
    try {
        const product = await productService.createProduct(req.body);
        return utils.returnHttpSuccessResponse(res, product);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
