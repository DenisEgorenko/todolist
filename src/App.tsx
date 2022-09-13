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
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store';
import {initializeAppTC, statusType} from './state/AppReducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './login/Login';
import {logoutTC} from './state/AuthReducer';

type appPropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false}: appPropsType) => {

    const status = useSelector<AppRootStateType, statusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}><CircularProgress/></div>
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
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
                    {isLoggedIn ? <Button onClick={logoutHandler} color={'inherit'}>Logout</Button>: null}
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


