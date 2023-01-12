import React from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PATH} from "./layout/routes/routes";
import {LoginPage} from "./layout/pages/login-page/LoginPage";
import {ProtectedComponents} from "./layout/ProtectedComponents";
import {MainPage} from "./layout/pages/main-page/MainPage";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATH.MAIN_PAGE} element={<ProtectedComponents/>}>
                    <Route index element={<MainPage/>}/>
                </Route>
                <Route path={PATH.LOGIN} element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
