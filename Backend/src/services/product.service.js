import ProductRepository from '../repositories/product.repository.js';

class ProductService {
  constructor(dbType) {
    this.productRepository = new ProductRepository(dbType);
  }

  async getProducts() {
    return await this.productRepository.getAll();
  }

  async getProductById(id) {
    return await this.productRepository.getById(id);
  }

  async createProduct(product) {
    return await this.productRepository.create(product);
  }

  async updateProduct(id, product) {
    return await this.productRepository.update(id, product);
  }

  async deleteProduct(id) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
