
import { Product } from '../../../interfaces/product.interface';

export type TableData = {
    headers: string[];
    rows: Product[];
    loading: boolean;
    status?: string;
    data?: any;
  };
  