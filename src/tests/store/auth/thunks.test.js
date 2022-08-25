
import { async } from "@firebase/util"
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../firebase/providers"
import { checkingCredentials, login, logout } from "../../../store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogOut } from "../../../store/auth/thunks"
import { clearNotesLogout } from "../../../store/journal"
import { authenicatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures"

jest.mock('../../../firebase/providers')

describe('pruebas en auththunks', () => { 
    const dispatch = jest.fn();
    beforeEach( () => jest.clearAllMocks() );
    
    test('debe invocar checkingcredentials', async() => {
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        // const valor = checkingCredentials();
     })

     test('startGoogleSignIn debe llamar checkingCredentiales y login - Exito', async() => { 
        const loginData = { ok: true, ...demoUser };

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      })

      test('startGoogleSignIn debe llamar checkingCredentiales y logout - Error', async() => { 
        const loginData = { ok: false, errorMessage: 'Error en google' };

        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

      })

      test('startLoginWithEmailPassword debe de de llamar checkignCredentials y login - Exito', async() => { 
            const loginData = {ok: true, ...demoUser};
            
            const formData = { email: demoUser.email, password: '123456'};

            await loginWithEmailPassword.mockResolvedValue( loginData );
            

            await startLoginWithEmailPassword( formData )( dispatch );

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials( ));
            expect( dispatch ).toHaveBeenCalledWith( login( loginData ));

            
       })

       test('startLogOut debe de llamar logoutFirebase, clearNotes y logout', async() => { 
            await startLogOut()( dispatch );
            expect( logoutFirebase ).toHaveBeenCalled();
            expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
            expect( dispatch ).toHaveBeenCalledWith( logout() );



        
        })
 })