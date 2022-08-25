import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( (state) => state.auth );

  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    //! no es la accion  despachar
    dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    
    dispatch( startGoogleSignIn( email, password ) );

  }
  return (
    <AuthLayout title="Login">
        <form onSubmit={ onSubmit } 
          aria-label='submit-form'
          className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid container>
                <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                    label="Correo" 
                    type="email" 
                    placeholder="example@domainexample.com"
                    fullWidth
                    name="email"
                    value={ email }
                    onChange = {onInputChange}
                    />
                </Grid>

                <Grid item xs={12} sx={{mt: 2}}>
                  <TextField 
                    label="Contraseña" 
                    type="password" 
                    placeholder="Contraseña"
                    fullWidth
                    name="password"
                    inputProps={{
                      'data-testid':'password'
                    }}
                    value={ password }
                    onChange = {onInputChange}
                    />
                </Grid>

                <Grid container spacing={ 2 } sx={{mb: 2, mt: 1}}>
                    <Grid item xs={12}
                    display={ !!errorMessage? '' : 'none' } >
                      <Alert severity='error'>
                        { errorMessage }
                      </Alert>
                    </Grid>

                    <Grid item xs={12} sm={ 6 }>
                      <Button type='submit'  disabled={isAuthenticating} variant='contained' fullWidth>
                        Login
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={ 6 }>
                      <Button onClick={ onGoogleSignIn } variant='contained' disabled={isAuthenticating} 
                      aria-label="google-btn"
                      fullWidth>
                        <Google />
                        <Typography sx={{ml: 1}}>Google</Typography>
                      </Button>
                    </Grid>
                </Grid>

                <Grid container direction='row' justifyContent='end'>
                  <Link component={ RouterLink } color='inherit' to='/auth/register'>  
                    Crear una cuenta
                  </Link>
                </Grid>
            </Grid>



        </form>
    </AuthLayout>
  )
}
