import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { LoginPage } from '../../../auth/pages/LoginPage'
import { authSlice } from "../../../store/auth/authSlice"
import { notAuthenticatedState } from "../../fixtures/authFixtures"


const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();


jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({email, password}) => { 
        return () => mockStartLoginWithEmailPassword({email, password});
     },
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }
})

describe('Pruebas en <LoginPage />', () => { 
    beforeEach( () => jest.clearAllMocks() );
    test('debe de mostrar el componente correctamente', () => {    
       
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
     })


     test('boton de google debe llamar startGoogleSignIN', () => { 
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        
        const googleBtn = screen.getByLabelText('google-btn');

        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled()

      })

      test('submit debe llamar startLoginWithEmailPassword', () => {
        const email = 'jesus@google.com';
        const password = '123456';
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );       

        const emailField = screen.getByRole('textbox', {name: 'Correo'});
        fireEvent.change( emailField, {target:{name: 'email', value: email}})

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, {target:{name: 'password', value: password}})
        const loginForm = screen.getByLabelText('submit-form');

        fireEvent.submit( loginForm )

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email,
            password
        })
      })
 })