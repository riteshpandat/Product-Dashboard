const BASE_URL = 'https://dummyjson.com/products';

export const api = {
  // Get all products with pagination, sorting, and field selection
  getAllProducts: async (params = {}) => {
    const { limit = 30, skip = 0, select, sortBy, order } = params;
    let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
    if (select) url += `&select=${select}`;
    if (sortBy && order) url += `&sortBy=${sortBy}&order=${order}`;
    
    const response = await fetch(url);
    return response.json();
  },

  // Get single product by ID
  getProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
  },

  // Search products
  searchProducts: async (query) => {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    return response.json();
  },

  // Get all categories
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    const response = await fetch(`${BASE_URL}/category/${category}`);
    return response.json();
  },

  // Add new product
  addProduct: async (productData) => {
    const response = await fetch(BASE_URL + '/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response.json();
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};