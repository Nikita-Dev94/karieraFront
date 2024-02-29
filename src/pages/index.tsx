import { lazy } from "react";
import { Route, Routes, Navigate  } from "react-router-dom";

const LoginPage = lazy(() => import("./login"));
const MainPage = lazy(() => import("./main"));

export const Routing = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
        </Routes>
    );
};

