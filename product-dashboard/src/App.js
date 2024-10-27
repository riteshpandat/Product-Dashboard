import React, { useState, useEffect } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import ProductList from './components/ProductList/Table';
import ProductForm from './components/ProductForm/Form';
import { Loading } from './components/shared/Button';
import { api } from './services/api';
import Analytics from './components/Analytics';


const App = () => {
  const [currentView, setCurrentView] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [pagination, setPagination] = useState({
    limit: 10,
    skip: 0,
    total: 0
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [pagination.skip, searchQuery, sortConfig]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery) {
        data = await api.searchProducts(searchQuery);
      } else {
        const params = {
          limit: pagination.limit,
          skip: pagination.skip
        };
        if (sortConfig) {
          params.sortBy = sortConfig.field;
          params.order = sortConfig.direction;
        }
        data = await api.getAllProducts(params);
      }
      // Ensure we're getting an array of products
      const productsArray = Array.isArray(data.products) ? data.products : [];
      setProducts(productsArray);
      setPagination(prev => ({ 
        ...prev, 
        total: data.total || productsArray.length 
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editProduct) {
        await api.updateProduct(editProduct.id, formData);
      } else {
        await api.addProduct(formData);
      }
      fetchProducts();
      setFormOpen(false);
      setEditProduct(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSort = (field, direction) => {
    setSortConfig({ field, direction });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, skip: 0 }));
  };


  const handleAddNew = () => {
    setEditProduct(null); // Ensure we're not in edit mode
    setFormOpen(true);
  };

  return (
    <DashboardLayout currentView={currentView} onViewChange={setCurrentView}>
      {loading ? (
        <Loading />
      ) : currentView === 'products' ? (
        <>
          <ProductList
            products={products}
            onEdit={(product) => {
              setEditProduct(product);
              setFormOpen(true);
            }}
            onSearch={handleSearch}
            onAddNew={handleAddNew} // Add this prop
            pagination={pagination}
            onPageChange={(skip) => setPagination(prev => ({ ...prev, skip }))}
            onSort={handleSort}
          />
          {formOpen && (
            <ProductForm
              product={editProduct}
              onSubmit={handleSubmit}
              onClose={() => {
                setFormOpen(false);
                setEditProduct(null);
              }}
            />
          )}
        </>
      ) : (
        <Analytics products={products} />
      )}
    </DashboardLayout>
  );
};

export default App;