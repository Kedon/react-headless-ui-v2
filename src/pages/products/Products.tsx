// This component manages the display, creation, editing, and deletion of products.
// It fetches data from the productsService, displays it in a table, allows adding/editing products
// through a form modal, and confirms deletions through a separate modal.

import React from 'react';

import {
  ActionButton, 
  AddEditProductForm, 
  DeleteProductModal,
  ProductList
} from './components';

import { ProductProvider } from './context/ProductsContext';

const Products: React.FC = () => {
  
  return (
    <ProductProvider>
      <ProductList />
      <DeleteProductModal />
      <AddEditProductForm />
      {/* Modal for adding/editing products */}
      {/* <AddEditProductForm
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        data={productToEdit}
        isOpen={modalIsOpen}
        toggle={productToEdit ? toggleEditProduct : toogleModal} /> */}

      {/* Modal for confirming product deletion */}
      {/* <DeleteProductModal
        item={productToDelete}
        toggle={toggleDeleteProduct}
        onDeleteProduct={handleDeleteProduct} 
        /> */}
    </ProductProvider>
  );
};

export default Products;