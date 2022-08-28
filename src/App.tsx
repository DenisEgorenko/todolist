import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ToDoListsList} from './components/ToDoListsList';
import {ErrorSnackbar} from './components/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {statusType} from './state/AppReducer';

type appPropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false}: appPropsType) => {

    const status = useSelector<AppRootStateType, statusType>(state => state.app.status)


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
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <ToDoListsList demo={demo}/>
            </Container>
        </div>
    );
})


