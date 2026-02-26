import axios from 'axios';

/**
 * Authentication Services
 */
async function authLoginAsync(payload) {
  return await axios.post('/auth/login', payload);
}

async function authRenewTokenAsync(payload) {
  return await axios.post('/auth/renew-token', payload);
}

async function createUserAsync(payload) {
  return await axios.post('/auth/register', payload);
}

/**
 * Task Services
 */
async function createTaskAsync(payload) {
  return await axios.post('/tasks', payload);
}

async function getTasksAsync() {
  return await axios.get('/tasks');
}

async function updateTaskAsync(taskId, payload) {
  return await axios.put(`/tasks/${taskId}`, payload);
}

async function deleteTaskAsync(taskId) {
  return await axios.delete(`/tasks/${taskId}`);
}

/**
 * Product Services
 */
async function createProductAsync(payload) {
  return await axios.post('/products', payload);
}

async function getProductsAsync() {
  return await axios.get('/products/list');
}

async function updateProductAsync(productId, payload) {
  return await axios.put(`/products/${productId}`, payload);
}

async function deleteProductAsync(productId) {
  return await axios.delete(`/products/${productId}`);
}

/**
 * Order Services
 */
async function createOrderAsync(payload) {
  return await axios.post('/order', payload);
}

async function getOrdersAsync() {
  return await axios.get('/order/list');
}

async function updateOrderAsync(orderId, payload) {
  return await axios.put(`/order/${orderId}`, payload);
}

async function deleteOrderAsync(orderId) {
  return await axios.delete(`/order/${orderId}`);
}

/**
 * Integration Services
 */
async function getxeroConnectAsync() {
  return await axios.get('/xero/connect');
}

export default {
  authLoginAsync,
  authRenewTokenAsync,
  createUserAsync,
  createTaskAsync,
  getTasksAsync,
  updateTaskAsync,
  deleteTaskAsync,
  getxeroConnectAsync,
  createProductAsync,
  getProductsAsync,
  updateProductAsync,
  deleteProductAsync,
  createOrderAsync,
  getOrdersAsync,
  updateOrderAsync,
  deleteOrderAsync,
};
