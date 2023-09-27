/**
 * DeleteProductModal Component
 *
 * This component represents a modal dialog for confirming the deletion of a product.
 * It displays the product's title and provides options to cancel or proceed with the deletion.
 *
 * @module Components/DeleteProductModal
 * @requires React
 * @requires Modal (imported component)
 * @requires Button (imported component)
 * @requires useProductData (custom hook for product data)
 */

import React from "react";
import Modal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';
import { useProductData } from '../context/ProductsContext';

// Define the DeleteProductModal component
const DeleteProductModal = () => {
    // Use the custom hook to access data and actions related to product deletion
    const {
        actions,
        productToDelete,
        requestState
    } = useProductData();

    return (
        <Modal
            testid="product-delete-modal"
            isOpen={productToDelete ? true : false} // Open when a product is set for deletion
            onClose={actions.toggleDeleteProduct}
            footer={<>
                <Button
                    disabled={requestState.inProcess}
                    color="white" 
                    onClick={() => actions.toggleDeleteProduct()}>Cancel</Button>
                <Button
                    testId="delete-button"
                    disabled={requestState.inProcess}
                    color="danger"
                    onClick={() => productToDelete ? actions.delete(productToDelete) : {}}>
                    Delete
                </Button>
            </>}
            title="Delete product"
        >
            {/* Display a confirmation message with the product's title */}
            This will delete <b>{productToDelete?.title}</b>. Are you sure?
        </Modal>
    );
};

export default DeleteProductModal;
