/**
 * ProductForm Component
 *
 * This component represents a form for adding or editing product details. It is displayed within a modal
 * and includes input fields for title and description, as well as buttons for canceling and submitting the form.
 *
 * @module Components/ProductForm
 * @requires React
 * @requires Modal (imported component)
 * @requires Button (imported component)
 * @requires Input (imported component)
 * @requires useProductData (custom hook for product data)
 */

import React from "react";
import Modal from '../../../components/modal/Modal';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import { useProductData } from '../context/ProductsContext';

const ProductForm: React.FC = () => {
    const {
        modalIsOpen,
        actions,
        requestState,
        formFields,
        validationErrors,
    } = useProductData();

    const { fields } = validationErrors || {};

    return (
        <Modal
            testid="product-form-modal"
            isOpen={modalIsOpen || formFields.id !== null} // Open on edit or add
            onClose={() => formFields.id ? actions.toggleEditProduct() : actions.toggleModal()}
            footer={<>
                <Button
                    disabled={requestState.inProcess}
                    color="white" 
                    onClick={() => formFields.id ? actions.toggleEditProduct() : actions.toggleModal()}>
                    Cancel
                </Button>
                <Button
                    testId="edit-or-add-button"
                    disabled={requestState.inProcess}
                    color={formFields.id ? "system" : "success"}
                    onClick={() => formFields.id ? actions.update(formFields) : actions.create(formFields) }>
                    {formFields.id ? "Edit" : "Add"}
                </Button>
            </>}
            title={formFields.id ? "Edit product" : "Add product"}
        >
            <Input
                type="text"
                name="title"
                testid="product-title"
                placeholder="Title"
                value={formFields.title}
                onChange={actions.handleFieldChange}
                error={fields.title}
            />
            <Input
                type="text"
                testid="product-description"
                name="description"
                placeholder="Description"
                value={formFields.description}
                onChange={actions.handleFieldChange}
                error={fields.description}
            />
        </Modal>
    );
};

export default ProductForm;