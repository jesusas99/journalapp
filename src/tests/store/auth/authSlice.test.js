import { authSlice, checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { authenicatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice', () => { 
    test('debe de regresar el estado inicial y regresar auth', () => { 
        expect( authSlice.name ).toBe('auth') // para probar que el slice tenga de nombre auth
        const state = authSlice.reducer( initialState, {} );
        expect(  state ).toEqual( initialState );
     })

     test('debe realizar la autenticacion', () => { 
        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual({
            status: 'authenticated', // checking, not-authenticated, authenicated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        } )
      })

      test('debe de realizar el logout sin argumentos ', () => { 
        const state = authSlice.reducer( authenicatedState , logout( ) );

        expect( state.errorMessage ).toBe( undefined );
     })

     test('debe de realizar el logout con argumentos ', () => { 
        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenicatedState , logout( { errorMessage: errorMessage} ) );

        expect( state.errorMessage ).toContain( errorMessage );
     })

     test('debe de cambiar el estado a checking ', () => {
        const state = authSlice.reducer( authenicatedState , checkingCredentials() );
        expect( state.status ).toBe( 'checking' );

     })
 })