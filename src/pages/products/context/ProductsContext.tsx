/**
 * ApiDataContext Component
 *
 * This component defines a context for managing product-related data and actions.
 * It provides a context for other components to access and manipulate product data and state.
 *
 * @module Components/ApiDataContext
 * @requires React
 * @requires createContext (from React)
 * @requires useContext (from React)
 * @requires useState (from React)
 * @requires useEffect (from React)
 * @requires ReactNode (from React)
 * @requires Product (imported product interface)
 * @requires various utility functions (imported from productPageLogic and ProductFormUtils)
 * @requires RequestState (imported interface)
 * @requires TableData (imported interface)
 * @requires initialFormFields (imported from ProductFormUtils)
 * @requires FieldsValidation (imported interface)
 * @requires getController (imported utility function)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { getController } from '../../../services/apis/configs/axiosUtils';

import { Product } from '../../../interfaces/product.interface';

import { RequestState, TableData } from '../interfaces';
import { FieldsValidation } from '../interfaces/fieldsValidation.interface';

import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  fetchData, 
  handleFieldChange, 
  toggleDeleteProduct, 
  toggleEditProduct 
} from '../utils/productPageLogic';

import { initialFormFields } from '../utils/ProductFormUtils';

// Define the context shape
interface ApiDataContextType {
  tableData: TableData;
  modalIsOpen: boolean;
  formFields: Product;
  validationErrors: FieldsValidation;
  productToDelete: Product | null;
  requestState: RequestState;
  actions: {
    create: (item: Product) => void;
    update: (item: Product) => void;
    delete: (item: Product) => void;
    toggleModal: () => void;
    toggleEditProduct: (item?: Product) => void;
    toggleDeleteProduct: (item?: Product) => void;
    handleDeleteItem: () => void;
    handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

// Create the context
const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

// Custom hook to access the context
export const useProductData = (): ApiDataContextType => {
  const context = useContext(ApiDataContext);
  if (context === undefined) {
    throw new Error('useProductData must be used within a ProductProvider');
  }
  return context;
};

// Context provider component
interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

  // State and data management
  const [tableData, setTableData] = useState<TableData>({
    headers: ["title", "description", "actions"],
    rows: [],
    loading: false
  });

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [requestState, setRequestState] = useState<RequestState>({
    inProcess: false,
    error: null
  });

  const [validationErrors, setValidationErrors] = useState<FieldsValidation>({
    message: '',
    fields: {
      title: '',
      description: ''
    }
  });

  const [formFields, setFormFields] = useState<Product>(initialFormFields);

  // Fetch data on component mount
  useEffect(() => {
    const controller = getController();
    fetchData(setTableData, controller.signal);

    // Cleanup function to abort the fetch request on unmount
    return () => { controller.abort(); };

  }, []);

  // Handle deleting an item
  const handleDeleteItem = () => {
    setProductToDelete(null);
  }

  // Reset modal state when the request is not in process
  useEffect(() => {
    if (!requestState.inProcess) {
      setModalIsOpen(false);
      setProductToDelete(null);
      setFormFields(initialFormFields);
    }
  }, [requestState.inProcess]);

  /** Context Actions */
  const actions = {
    create: (item: Product) => createProduct({item, setTableData, setRequestState, setValidationErrors}),
    update: (item: Product) => updateProduct({item, setTableData, setRequestState, setValidationErrors}),
    delete: (item: Product) => deleteProduct({item, setTableData, setRequestState}),
    toggleModal: () => setModalIsOpen(!modalIsOpen),
    toggleEditProduct: (item?: Product) => toggleEditProduct(setFormFields, item, initialFormFields),
    toggleDeleteProduct: (item?: Product) => toggleDeleteProduct(setProductToDelete, item),
    handleDeleteItem: () => handleDeleteItem(),
    handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange(e, setFormFields, setValidationErrors)
  };
  /** Context Actions */

  // Value provided by the context
  const contextValue: ApiDataContextType = {
    tableData,
    actions,
    modalIsOpen,
    requestState,
    productToDelete,
    formFields,
    validationErrors
  };

  // Provide the context to child components
  return (
    <ApiDataContext.Provider value={contextValue}>
      {children}
    </ApiDataContext.Provider>
  );
};