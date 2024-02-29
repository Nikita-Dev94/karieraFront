import type { AxiosPromise } from "axios";
import { apiInstance } from "./base";
import type {Auth, Registration} from "./models";

const BASE_URL_AUTH = "auth/login"
const BASE_URL_REG = "auth/register"

export const auth = (params: Auth): AxiosPromise<any> => {
    return apiInstance.post(BASE_URL_AUTH, params);
};
export const registration = (params: Registration): AxiosPromise<any> => {
    return apiInstance.post(BASE_URL_REG, params);
};
