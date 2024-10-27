export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };
  
  export const truncateText = (text, length = 50) => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };
  
  // validators.js
  export const validateProduct = (product) => {
    const errors = {};
  
    if (!product.title?.trim()) {
      errors.title = 'Title is required';
    }
  
    if (!product.price || product.price <= 0) {
      errors.price = 'Valid price is required';
    }
  
    if (!product.category?.trim()) {
      errors.category = 'Category is required';
    }
  
    if (!product.stock || product.stock < 0) {
      errors.stock = 'Valid stock quantity is required';
    }
  
    return errors;
  };