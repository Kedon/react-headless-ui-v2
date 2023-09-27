/**
 * Products Component
 *
 * This component represents a view for displaying a list of products in a table format.
 * It includes a header section with an "Add new" button and a table to display product data.
 * The table includes actions for deleting and editing products.
 *
 * @module Components/Products
 * @requires React
 * @requires Button
 * @requires styled-components (imported styles)
 * @requires ActionButton (imported component)
 * @requires useProductData (custom hook for product data)
 */

import React from 'react';
import Button from '../../../components/button/Button';

import {
    ProductHeaderContainer,
    TableWrapper,
    StyledTable,
    TableHeader,
    TableRow,
    TableCell,
    ProductActionsButtons
} from '../styles';

import {
    ActionButton
} from '../components';

import { useProductData } from '../context/ProductsContext';

const Products: React.FC = () => {
    const {
        tableData,
        actions
    } = useProductData();

    return (
        <div>
            {/* Header section */}
            <ProductHeaderContainer>
                <h3>Products</h3>
                <Button
                    testId="add-product-button"
                    onClick={actions.toggleModal}
                    color="success">
                    Add new
                </Button>
            </ProductHeaderContainer>

            {/* Table displaying product data */}
            <TableWrapper>
                <StyledTable>
                    <thead>
                        <tr>
                            {/* Map headers to create table header cells */}
                            {tableData.headers.map((header, index) => (
                                <TableHeader key={index}>{header}</TableHeader>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map rows to create table rows */}
                        {tableData.rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {tableData.headers.map((header, colIndex) => {
                                    return tableData.headers.length - 1 === colIndex ? (
                                        // Actions column with delete and edit buttons
                                        <TableCell key={colIndex}>
                                            <ProductActionsButtons>
                                                <ActionButton
                                                    item={row}
                                                    onClick={actions.toggleDeleteProduct}
                                                    color="danger"
                                                    label="Del" />
                                                <ActionButton
                                                    item={row}
                                                    onClick={actions.toggleEditProduct}
                                                    color="system"
                                                    label="Edit" />
                                            </ProductActionsButtons>
                                        </TableCell>
                                    ) : (
                                        // Non-action columns with product data
                                        <TableCell key={colIndex}>{(row as any)[header]}</TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </div>
    );
};

export default Products;
