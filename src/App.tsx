import {BrowserRouter, Route, Routes} from "react-router-dom";
import {selectAppError, selectAppStatus} from "./app/selectors";
import {ProtectedComponents} from "./layout/ProtectedComponents";
import {MainPage} from "./layout/pages/main-page";
import {LoginPage} from "./layout/pages/login-page";
import {NotFound} from "./layout/NotFound";
import {PATH} from "./layout/routes";
import {Preloader, ErrorSnackbar, PreloaderContainer} from "common/components";
import {useAppDispatch, useAppSelector, useCustomComponentWillMount} from "common/hooks";
import {authMe} from "./features/login/loginSlice";
import React from "react";
import "./App.scss";

function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectAppStatus)
    const error = useAppSelector(selectAppError)
    useCustomComponentWillMount(() => {
        dispatch(authMe())
    })

    return (
        <BrowserRouter>
            {error && <ErrorSnackbar errorMessage={error}/>}
            <PreloaderContainer condition={status === "loading"} loader={<Preloader/>}>
                <Routes>
                    <Route path={PATH.DEFAULT} element={<ProtectedComponents/>}>
                        <Route path={PATH.MAIN_PAGE} element={<MainPage/>}/>
                    </Route>
                    <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </PreloaderContainer>
        </BrowserRouter>
    )
}

export default App;
