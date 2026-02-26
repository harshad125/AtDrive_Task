import ProductService from '../../services/product.service.js';
import utils from "../../helper/utils.js";
import * as userError from '../../helper/userError.js';

const productService = new ProductService('mongo');

export default async function getProductById(req, res, next) {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return next(new userError.NotFoundError(null, 'Product not found'));
        }
        return utils.returnHttpSuccessResponse(res, product);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
