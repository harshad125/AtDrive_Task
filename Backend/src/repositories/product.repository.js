import MongoProduct from '../models/product.mongo.js';

class ProductRepository {
  constructor(dbType) {
    this.Product = MongoProduct;
  }

  async getAll() {
    return this.Product.findAll ? await this.Product.findAll() : await this.Product.find();
  }

  async getById(id) {
    return this.Product.findByPk ? await this.Product.findByPk(id) : await this.Product.findById(id);
  }

  async create(product) {
    return this.Product.create ? await this.Product.create(product) : await this.Product.create(product);
  }

  async update(id, product) {
    if (this.dbType === 'mysql') {
      return await this.Product.update(product, { where: { id } });
    } else {
      return await this.Product.findByIdAndUpdate(id, product, { new: true });
    }
  }

  async delete(id) {
    if (this.dbType === 'mysql') {
      return await this.Product.destroy({ where: { id } });
    } else {
      return await this.Product.findByIdAndDelete(id);
    }
  }
}

export default ProductRepository;
