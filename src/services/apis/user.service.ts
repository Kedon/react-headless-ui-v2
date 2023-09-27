/**
 * User Service Module.
 * 
 * This module provides a set of functions to interact with user-related endpoints in the API.
 * It leverages axios for making HTTP requests and provides typed methods for various user operations.
 *
 * Features include:
 * 1. Fetching all users or a specific user by ID.
 * 2. Searching users based on a query.
 * 3. Filtering users based on certain criteria.
 * 4. Fetching users with custom parameters.
 * 5. CRUD operations on users.
 * 
 * Each method supports cancelation using a cancelation token to abort requests if needed.
 * 
 * Usage example:
 * userService.get().then(data => console.log(data)).catch(error => console.error(error));
 * 
 */

import { AxiosResponse } from 'axios';
import { client } from './configs/axiosUtils';
import { User, UserResponse } from '../../interfaces/user.interface';
import { CancelationToken } from '../../interfaces/cancelationToken.interface';
import { QueryParams } from '../../interfaces/queryParams.interface';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

/** Interface for user-related API operations */
type UserService = {
    // get(params?: QueryParams, cancelation?: CancelationToken): Promise<{ data: UserResponse }>;
    // getById(id: Pick<User, 'id'>, cancelation?: CancelationToken): Promise<{ data: User }>;
    // searchUsers(query: string, cancelation?: CancelationToken): Promise<{ data: UserResponse }>;
    // filterUsers(
    //     key: string, 
    //     value: string, 
    //     options?: { 
    //         limit?: number; 
    //         skip?: number; 
    //         select?: string[]; 
    //         cancelation?: CancelationToken
    //     }, 
        
    //   ): Promise<{ data: UserResponse }>;

    //   getUsersByParams(
    //     options?: {
    //         limit?: number; 
    //         skip?: number; 
    //         select?: string[];
    //         cancelation?: CancelationToken
    //     }, 
    //   ): Promise<{ data: UserResponse }>;
    //   post(user: User, cancelation?: CancelationToken): Promise<{ data: User }>;
    //   put(id: Pick<User, 'id'>, user: User, cancelation?: CancelationToken): Promise<{ data: User }>;
    //   delete(id: Pick<User, 'id'>, cancelation?: CancelationToken): Promise<{ data: User }>;
    other: () => void;
      

}

/** Implementation of user-related API operations */
const userService: UserService = {
    // get: (params?: QueryParams, cancelation?: CancelationToken): Promise<{ data: UserResponse }> => {
    //     return client()
    //         .get({ url: API_URL, params, ...cancelation})
    //         .then((res: AxiosResponse<UserResponse>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });
    // },
    // getById: (id: Pick<User, 'id'>, cancelation?: CancelationToken) => {
    //     return client()
    //         .get({url: `${API_URL}/${id}`, ...cancelation})
    //         .then((res: AxiosResponse<User>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });

    // },
    // searchUsers: (query: string, cancelation?: CancelationToken) => {
    //     return client()
    //         .get({url: `${API_URL}/search/?q=${query}`, ...cancelation})
    //         .then((res: AxiosResponse<UserResponse>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });

    // },
    // filterUsers: (
    //     key: string, 
    //     value: string, 
    //     options = {} as { 
    //         limit?: number; 
    //         skip?: number; 
    //         select?: string[]; 
    //         cancelation?: CancelationToken
    //     }
    //     ) => {

    //         const { limit, skip, select } = options;

    //         let params: any = {
    //             key,
    //             value
    //         };
    
    //         if (limit !== undefined) params.limit = limit;
    //         if (skip !== undefined) params.skip = skip;
    //         if (select !== undefined && select.length > 0) params.select = select.join(',');
    //         /** Example usage:
    //             userService.filterUsers('hair.color', 'Brown', { limit: 5, skip: 2, select: ['firstName', 'lastName'], signal: AbortSignal })
    //             .then(data => console.log(data))
    //             .catch(error => console.error(error));
    //         */
    //         return client()
    //             .get({ url: `${API_URL}/filter`, params})
    //             .then((res: AxiosResponse<UserResponse>) => ({ data: res.data }))
    //             .catch((error: Error) => { throw error });

    
    // },
    // getUsersByParams: (options = {} as {
    //     limit?: number; 
    //     skip?: number; 
    //     select?: string[];
    //     cancelation?: CancelationToken
    // }): Promise<{ data: UserResponse }> => {

    //     const { limit, skip, select } = options;

    //     let params: any = {};

    //     if (limit !== undefined) params.limit = limit;
    //     if (skip !== undefined) params.skip = skip;
    //     if (select !== undefined && select.length > 0) params.select = select.join(',');

    //     /** Example usage:
    //         userService.getUsersByParams({ limit: 5, skip: 10, select: ['firstName', 'age'], signal: AbortSignal })
    //         .then(data => console.log(data))
    //         .catch(error => console.error(error));
    //      */

    //     return client()
    //         .get({url: `${API_URL}/`, params})
    //         .then((res: AxiosResponse<UserResponse>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });
    // },
    // post: (user: User): Promise<{ data: User }> => {
    //     return client()
    //         .post(`${API_URL}/`, user)
    //         .then((res: AxiosResponse<User>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });
    // },    
    // put: (id: Pick<User, 'id'>, user: User, cancelation?: CancelationToken): Promise<{ data: User }> => {
    //     return client()
    //         .put(`${API_URL}/${id}`, { ...user, ...cancelation })
    //         .then((res: AxiosResponse<User>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });
    // },
    // delete: (id: Pick<User, 'id'>, cancelation?: CancelationToken): Promise<{ data: User }> => {
    //     return client()
    //         .delete(`${API_URL}/${id}`, { ...cancelation })
    //         .then((res: AxiosResponse<User>) => ({ data: res.data }))
    //         .catch((error: Error) => { throw error });
    // }
    other: () => {
        console.log('other');
    }
};

export default userService;
