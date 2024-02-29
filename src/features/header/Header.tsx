import React, {useEffect, useRef, useState} from 'react';
import {ReactComponent as Logo} from "../../shared/img/logo.svg"
import s from "./styles.module.scss"
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../app/store/strore"
import {getUserData} from '../../app/store/userSlice';
import {getToken} from "../../app/utils/utils";
import {getUserById} from "../../shared/api/typicode/user";
import {NavLink} from "react-router-dom";
import {BsFillPersonFill, BsBoxArrowRight} from "react-icons/bs"

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const userName = useSelector((state: RootState) => state.user.name);
    const [showUserMenu, setShowUserMenu] = useState(false);
    let isAdmin: boolean = false
    const tokenData = getToken();
    if (tokenData && tokenData.isAdmin) {
        isAdmin = true;
    }
    const exitRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

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
        const handleOutsideClick = (event: { target: any; }) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && !menuRef.current.parentElement?.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (<header className={s.header}>
        <div className={s.leftSide}>
            <nav>
                <NavLink className={navData => `${s.link} ${navData.isActive ? s.active : ''}`}
                         to={"/main"}>Главная</NavLink>
                <NavLink className={navData => `${s.link} ${navData.isActive ? s.active : ''}`}
                         to={"/vacancies"}>Вакансии</NavLink>
                <NavLink className={navData => `${s.link} ${navData.isActive ? s.active : ''}`}
                         to={"/tests"}>Тесты</NavLink>
                <NavLink className={navData => `${s.link} ${navData.isActive ? s.active : ''}`} to={"/chat"}>Чат с
                    HR</NavLink>
            </nav>
        </div>
        <div className={s.middleLogo}>
            <Logo/>
        </div>
        <div className={s.userWrapper}>
            <img src={process.env.PUBLIC_URL + '/img/avtar.png'} alt={userName}/>
            <p className={`${s.userName} ${showUserMenu ? s.show : ""}`} ref={menuRef}
               onClick={() => {
                   setShowUserMenu(!showUserMenu)
               }}>{userName}</p>
            {showUserMenu && (<div className={`${s.userMenu} ${showUserMenu ? s.show : ""}`}>
                    <nav>
                        <ul>
                            <li className={s.userMenuLink}>
                                <BsFillPersonFill className="icons"/>
                                <NavLink to={"/profile"}>Профиль</NavLink>
                            </li>
                            <li className={s.userMenuLink}>
                                <span ref={exitRef}>
                                <BsBoxArrowRight className="icons"/>
                            <span>Выйти</span>
                                    </span>
                            </li>
                        </ul>
                    </nav>

                </div>)}
        </div>
    </header>)
}
export default Header;
