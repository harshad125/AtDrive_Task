import ProductService from '../../services/product.service.js';
import utils from "../../helper/utils.js";

const productService = new ProductService('mongo'); // Following previous routes default

export default async function getProducts(req, res, next) {
    try {
        const products = await productService.getProducts();
        return utils.returnHttpSuccessResponse(res, products);
    } catch (error) {
        console.error(error);
        return next(error);
    }
}
