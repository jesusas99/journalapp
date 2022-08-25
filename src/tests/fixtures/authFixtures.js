export const initialState = {
    status: 'checking', // checking, not-authenticated, authenicated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenicatedState = {
    status: 'authenticated', // checking, not-authenticated, authenicated
    uid: '1234ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', // checking, not-authenticated, authenicated
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}


export const demoUser = {
    uid: '1234ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
}