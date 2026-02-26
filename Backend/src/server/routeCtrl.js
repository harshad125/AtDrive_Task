import authRoute from '../routes/user.routes.js';
import productRoute from '../routes/product.routes.js';
import orderRoute from '../routes/order.routes.js';

const setRoutes = (app) => {
  app.all('/auth*', authRoute);
  app.all('/products*', productRoute);
  app.all('/order*', orderRoute);
};

export default setRoutes;
