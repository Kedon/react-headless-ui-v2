import { QueryParams } from "./queryParams.interface";
import { CancelationToken } from "./cancelationToken.interface";
import { Product } from "./product.interface";

export interface GetRequest extends CancelationToken {
    queryParams?: QueryParams;
}

export interface RequestData extends CancelationToken {
    requestData?: Product;
}

export interface PutRequestParams extends RequestData {
    id: number;
}

export interface DeleteRequestParams extends RequestData {
    id: number;
}