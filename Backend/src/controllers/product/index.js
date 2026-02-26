import getProducts from './getProducts.js';
import getProductById from './getProductById.js';
import createProduct from './createProduct.js';
import updateProduct from './updateProduct.js';
import deleteProduct from './deleteProduct.js';

class ProductCtrl {
    static getProducts = getProducts;
    static getProductById = getProductById;
    static createProduct = createProduct;
    static updateProduct = updateProduct;
    static deleteProduct = deleteProduct;
}

export default ProductCtrl;
