import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {FormikHelpers, useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../state/store';
import {loginTC} from '../state/AuthReducer';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from "../state/selectors";

type LoginProps = {}


type formValueType = {
    email: string,
    password: string,
    rememberMe: boolean
}

function Login(props: LoginProps) {

    const dispatch = useAppDispatch()


    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<formValueType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldErrors?.length) {
                    const error = action.payload?.fieldErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });


    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'}
                                          checked={formik.values.rememberMe}
                                          control={<Checkbox/>}
                                          {...formik.getFieldProps('rememberMe')}/>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

export default Login