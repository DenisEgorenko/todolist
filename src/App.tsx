import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ToDoListsList} from './components/ToDoListsList';
import {ErrorSnackbar} from './components/ErrorSnackBar';
import {RootState, useAppDispatch, useAppSelector} from './state/store';
import {initializeAppTC, statusType} from './state/AppReducer';
import {Route, Routes} from 'react-router-dom';
import Login from './login/Login';
import {logoutTC} from './state/AuthReducer';
import {selectIsInitialized, selectIsLoggedIn, selectStatus} from "./state/selectors";

type appPropsType = {
    demo?: boolean
}


export const App = React.memo(({demo = false}: appPropsType) => {

    const status = useAppSelector(selectStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(initializeAppTC({}))
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            <CircularProgress/></div>
    }

    const logoutHandler = () => {
        dispatch(logoutTC({}))
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn ? <Button onClick={logoutHandler} color={'inherit'}>Logout</Button> : null}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<ToDoListsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
})


