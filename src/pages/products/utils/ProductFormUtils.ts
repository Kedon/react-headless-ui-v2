/**
 * ProductFormUtils.ts
 *
 * This module contains utility functions and definitions related to the ProductForm component.
 * It separates the prop types, initial field values, and validation logic to promote modularity
 * and organization in the codebase.
 */

import { RequiredFields } from "../interfaces/productForm.interface";

export const initialRequiredFields: RequiredFields = {
    title: '',
    description: ''
};

export const initialFormFields = {
    id: null,
    title: '',
    description: ''
};