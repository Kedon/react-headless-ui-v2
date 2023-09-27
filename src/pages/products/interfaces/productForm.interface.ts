import { Product } from '../../../interfaces/product.interface';

export type ProductFormProps = {
    isOpen: boolean;
    toggle: () => void;
    data: Product | null;
    onAddProduct: (product: Product) => void;
    onUpdateProduct: (product: Product) => void;
};

export type RequiredFields = {
    title: string;
    description: string;
};
