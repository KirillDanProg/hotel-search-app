import React from "react";
import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PATH} from "./layout/routes/routes";
import {LoginPage} from "./layout/pages/login-page/LoginPage";
import {ProtectedComponents} from "./layout/ProtectedComponents";
import {MainPage} from "./layout/pages/main-page/MainPage";
import {useAppDispatch, useAppSelector} from "./common/hooks/redux-hooks";
import {authMe} from "./features/login/loginSlice";
import {selectAppError, selectAppStatus} from "./app/selectors";
import {Preloader} from "./common/components/preloader/Preloader";
import {useCustomComponentWillMount} from "./common/hooks/useCustomComponentWillMount";
import {ErrorSnackbar} from "./common/components/snackbar/ErrorSnackbar";
import {NotFound} from "./layout/NotFound";


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
            {
                status === "loading"
                    ? <Preloader/>
                    : <Routes>
                        <Route path={PATH.DEFAULT} element={<ProtectedComponents/>}>
                            <Route path={PATH.MAIN_PAGE} element={<MainPage/>}/>
                        </Route>
                        <Route path={PATH.LOGIN} element={<LoginPage/>}/>
                        <Route path={"*"} element={<NotFound/>}/>
                    </Routes>
            }

        </BrowserRouter>
    )
}

export default App;
