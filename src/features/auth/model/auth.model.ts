import {Registration} from "../../../shared/api";
import {registration} from "../../../shared/api/typicode/auth";
import {Auth} from "../../../shared/api";
import {auth} from "../../../shared/api/typicode/auth";
import Cookies from "universal-cookie";
export const registrationUser = async (values: any )=> {
    const data: Registration = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email.currentTarget.value,
        password: values.password
    }
    registration(data)
        .then(response => {
            const cookies = new Cookies();
            cookies.set('token', response.data.token, { path: '/' });
             // Pacman
        })
        .catch(response => {
            console.error(response);
            // Обработайте ошибку, например, показом сообщения об ошибке
        });
}
export const loginUser = async (values: any)=> {

    const data: Auth = {
        email: values.email.currentTarget.value, password: values.password
    }
    await auth(data)
        .then(response => {
            const cookies = new Cookies();
            cookies.set('token', response.data.token, { path: '/' });
             // Pacman
        })
        .catch(response => {
            console.error(response);
            // Обработайте ошибку, например, показом сообщения об ошибке
        });
}
