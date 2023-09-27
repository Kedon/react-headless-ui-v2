import styled from 'styled-components';
import light from '../../../styles/themes/light';

interface ProductActionsButtonProps {
    color: keyof typeof light.colors; 
}

export const ProductActionsButton = styled.button<ProductActionsButtonProps>`
    display: flex;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
        margin-right: 10px;
    }
    background-color: transparent;
    color: ${({ color, theme }) => theme.colors[color]};
    &:hover {
        background-color: ${({ color, theme }) => theme.colors[color]};
        color: white;
    }
`;
