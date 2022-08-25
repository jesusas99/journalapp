import { collection, deleteDoc, getDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../store/journal/journalSlice";
import { startNewNote } from "../../../store/journal/thunks";

describe('Pruebas en journal thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota en blanco', async() => { 
        const uid = 'TEST-UID';

        getState.mockReturnValue({ auth: { uid } } );
        
        await startNewNote(  )( dispatch,  getState );
        
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }) ); 

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }) ); 

        

        //Brrar de FB
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);

        const docs = await getDocs( collectionRef );
        // console.log(docs)

        const deletePromises = [];

        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref ) ) );

        await Promise.all( deletePromises );
     })
 })