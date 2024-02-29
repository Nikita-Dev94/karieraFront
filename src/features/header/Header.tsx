import React, {useEffect} from 'react';
import {ReactComponent as Logo} from "../../shared/img/logo.svg"
import s from "./styles.module.scss"
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../app/store/strore"
import {getUserData} from '../../app/store/userSlice';
import {getToken} from "../../app/utils/utils";
import {getUserById} from "../../shared/api/typicode/user";

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.user.name);
    let isAdmin: boolean = false
    const tokenData = getToken();
    if (tokenData && tokenData.isAdmin) {
        isAdmin = true;
    }
    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await getUserById(tokenData?.userId); // Вызываем userData как функцию
                const data = res.data
                dispatch(getUserData({
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    middleName: data.middleName,
                    email: data.email,
                    registrationDate: data.registrationDate,
                    admin: data.admin,
                    experience: data.experience,
                    programmingLanguages: data.programmingLanguages,
                    frameworks: data.frameworks,
                    additionalInfo: data.additionalInfo,
                }));
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }


        };

        fetchData()
    }, []);

    return (<header className={s.header}>
        <Logo/>
        <p>{userName}</p>
        {isAdmin && (<p>ты админ, сучка</p>)}
    </header>)
}
export default Header;
