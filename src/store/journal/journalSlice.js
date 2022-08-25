import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
reducers: {
    savingNewNote: ( state ) => {
      state.isSaving = true;
    },
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },

    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved  = '';
    },

    setNotes: ( state, action ) => {
      state.notes = action.payload;
    },

    setSaving: ( state ) => {
      state.isSaving = true;
      state.messageSaved  = '';
    },

    updateNote: ( state, action ) => {
      state.isSaving = false;
      state.notes = state.notes.map(
          note => {
            return note.id === action.payload.id ? action.payload : note ;
          }
      );

      state.messageSaved = `${ action.payload.title } actualizada correctamente.`
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.active.imageURLS = [...state.active.imageURLS, ...action.payload ];
    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved ='';
      state.notes = [];
      state.active = null;

    },
    deleteNoteById: ( state, action ) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload );     
    },
    clearActiveByDeleting: ( state ) => {
      state.active = null;
    }
  }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    clearActiveByDeleting,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
 } = journalSlice.actions;