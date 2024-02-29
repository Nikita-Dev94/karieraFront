import React, {useState} from 'react';
import LoginForm from '../../features/auth/ui/LoginForm';
import RegisterForm from '../../features/auth/ui/RegisterForm';
import s from "./styles.module.scss"
import { ReactComponent as Logo } from "../../shared/img/logo.svg"
const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между входом и регистрацией

    const toggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const target = e.target as HTMLButtonElement;
        target.getAttribute("datatype") === "login" ? setIsLogin(true) : setIsLogin(false)
    }; // Переключение формы

    return (<div className={s.authPage}>
            <div className={s.authWrapper}>
                <div className={s.authHeader}>
                    <div className={s.headerImg}>
                       <Logo/>
                        <p className={s.cariera}>Карьера</p>
                    </div>
                    <div className={s.buttonWrapper} >
                    <button datatype={"login"} className={`${s.btn} ${isLogin ? s.active : ""}`} onClick={(event)=> {
                        toggleForm(event)
                    }}>
                       Вход
                    </button>
                    <button datatype={"register"} className={`${s.btn} ${!isLogin ? s.active : ""}`} onClick={(event)=> {
                        toggleForm(event)
                    }}>
                       Регистрация
                    </button>
                    </div>
                </div>
                {isLogin ? <LoginForm/> : <RegisterForm/>}

            </div>
        </div>);
};

export default AuthPage;
