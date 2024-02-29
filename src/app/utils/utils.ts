import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";

type TokenData = {
    userId: number; isAdmin: boolean;
};

export const getToken = (): TokenData | null => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);
            const {userId, isAdmin} = decodedToken;
            return {userId, isAdmin};
        } catch (error) {
            console.error('Ошибка декодирования токена:', error);
        }
    } else {
        console.error('Токен не найден в куках');
    }

    return null;
};
