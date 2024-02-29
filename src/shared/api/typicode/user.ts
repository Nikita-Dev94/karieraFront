import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";

let BASE_URL_USER = "users/"

export const getUserById = (id: number | undefined): AxiosPromise<any> => {
    BASE_URL_USER += id
    return apiInstance.get(BASE_URL_USER);
};

