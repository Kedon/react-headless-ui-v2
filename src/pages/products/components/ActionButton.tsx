/**
 * ActionButton Component
 *
 * This component represents a button used for various actions (e.g., edit, delete) on a product item.
 *
 * @module Components/ActionButton
 * @requires React
 * @requires ProductActionsButton (imported styled component)
 * @requires Product (imported product interface)
 */

import React from 'react';
import { ProductActionsButton } from './actionButton.styles'; // Import styled component
import { Product } from '../../../interfaces/product.interface'; // Import product interface
import colorConfig from '../../../styles/themes/dark'

/**
 * Props for the ActionButton component
 * @typedef {object} ActionButtonProps
 * @property {Product} item - The product item associated with the action.
 * @property {(product: Product) => void} onClick - The function to execute when the button is clicked.
 * @property {string} color - The color variant of the button.
 * @property {string} label - The label or text displayed on the button.
 */

interface ActionButtonProps {
    item: Product,
    onClick: (product: Product) => void,
    color:  keyof typeof colorConfig.colors,
    label: string
}

/**
 * The ActionButton component
 *
 * @param {ActionButtonProps} props - The props for the ActionButton component.
 */
const ActionButton: React.FC<ActionButtonProps> = ({ item, onClick, color, label }) => (
    <ProductActionsButton 
        onClick={() => onClick(item)} // Execute the provided onClick function with the associated product
        color={color}>
        {label}
    </ProductActionsButton>
);

export default ActionButton;
