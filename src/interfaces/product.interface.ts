/**
 * Product-related interfaces module.
 * 
 * This module provides TypeScript type definitions for product-related entities and operations.
 * 
 */

export interface Product {
    id?: number | null;
    title: string;
    description: string;
    actions?: string | JSX.Element;
}

export interface ProductResponse {
    limit: number;
    products: Product[];
    skip: number;
    total: number;
}