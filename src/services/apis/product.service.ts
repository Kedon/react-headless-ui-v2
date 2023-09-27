import { AxiosResponse } from 'axios';
import { client } from './configs/axiosUtils';
import { ProductResponse, Product } from '../../interfaces/product.interface';
import { CancelationToken } from '../../interfaces/cancelationToken.interface';
import { QueryParams } from '../../interfaces/queryParams.interface';
import { GetRequest, RequestData, PutRequestParams } from '../../interfaces/getRequest.interface';

const API_URL = `${process.env.REACT_APP_API_URL}/products`;

interface RequestDataWithId extends RequestData {
  id: number;
}

type ProductsService = {
    get(params?: GetRequest): Promise<{ data: ProductResponse }>;
    post(params: RequestData): Promise<{ data: Product }>;
    put(params: RequestData): Promise<{ data: Product }>;
    delete(params: RequestData): Promise<{ data: Product }>;
}

const productsService: ProductsService = {
    get: (params?: GetRequest): Promise<{ data: ProductResponse }> => {
        return client()
            .get({url: `${API_URL}`, params: params?.queryParams, cancelation: params?.cancelation})
            .then((res: AxiosResponse<ProductResponse>) => ({ data: res.data }))
            .catch((error: Error) => { throw error });
    },
    post: (params?: RequestData): Promise<{ data: Product }> => {
        return client()
            .post({ url: `${API_URL}/add`, requestData: params?.requestData, cancelation: params?.cancelation})
            .then((res: AxiosResponse<Product>) => ({ data: res.data }))
            .catch((error: Error) => { throw error });
    },
    put: (params?: RequestData): Promise<{ data: Product }> => {
        return client()
            .put({ url: `${API_URL}/${params?.requestData?.id}`, 
                requestData: {
                    ...params?.requestData,
                    id: undefined
                }, 
                cancelation: params?.cancelation
            })
            .then((res: AxiosResponse<Product>) => ({ data: res.data }))
            .catch((error: Error) => { throw error });
    },
    delete: (params?: RequestData): Promise<{ data: Product }> => {
        console.log(params?.requestData?.id)
        return client()
        .delete({ url: `${API_URL}/${params?.requestData?.id}`, cancelation: params?.cancelation})
        .then((res: AxiosResponse<Product>) => ({ data: res.data }))
            .catch((error: Error) => { throw error });
    },
};

export default productsService;
