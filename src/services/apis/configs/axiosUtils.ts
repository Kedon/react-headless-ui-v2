import axios, { AxiosResponse, AxiosError } from 'axios';
import { auth } from '../../../auth/auth';

const getController = () => {
    return new AbortController();
};

type GetParams = {
    url: string;
    params?: Record<string, any>;
    cancelation?: AbortSignal | {};
};

type RequestParams = {
    url: string;
    requestData?: Record<string, any>;
    cancelation?: AbortSignal | {};
}

interface Client {
    get: ({ url, params, cancelation }: GetParams) => Promise<AxiosResponse>;
    post: ({ url, requestData, cancelation }: RequestParams) => Promise<AxiosResponse>;
    put: ({ url, requestData, cancelation }: RequestParams) => Promise<AxiosResponse>;
    patch: ({ url, requestData, cancelation }: RequestParams) => Promise<AxiosResponse>;
    delete: ({ url, requestData, cancelation }: RequestParams) => Promise<AxiosResponse>;
}

const client = (): Client => {
    const token = auth.accessToken();
    const defaultOptions = {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
    };

    return {
        get: ({url, params = {}, cancelation = {}}) => axios.get(url, { ...defaultOptions, params: params,  signal: cancelation as AbortSignal }),
        post: ({url, requestData = {}, cancelation = {}}) => axios.post(url, requestData, { ...defaultOptions, signal: cancelation as AbortSignal }),
        put: ({url, requestData = {}, cancelation = {}}) => axios.put(url, requestData, { ...defaultOptions, signal: cancelation as AbortSignal }),
        patch: ({url, requestData = {}, cancelation = {}}) => axios.patch(url, requestData, { ...defaultOptions, signal: cancelation as AbortSignal }),
        delete: ({url, cancelation = {}}) => axios.delete(url, { ...defaultOptions, signal: cancelation as AbortSignal }),
    };
};

// defining a custom error handler for all APIs
const errorHandler = (error: AxiosError) => {
    const statusCode = error.response?.status ?? 0;
    if(error.code === 'ERR_CANCELED') {
        /** If you want, you can do something when cancelation occurs */
        console.error(error.code);
    } else if (statusCode && statusCode !== 401) {
        // logging only errors that are not 401
        console.error(error);
    } else {
      // if the error is 401, we log out the user
      // and redirect them to the login page
      auth.doSignOut();
    }

    return Promise.reject(error);
};

// registering the custom error handler to the "api" axios instance
axios.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
});

export {
    getController,
    client
};
