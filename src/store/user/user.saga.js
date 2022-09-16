import {all, takeLatest, put, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types'
import { signInSuccess, signInFailure } from './user.action';

import { createUserDocumentFromAuth, getCurrentUser } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalsDetails){
    try{
        const userSnapshot = yield call(
            createUserDocumentFromAuth,
            userAuth, 
            additionalsDetails
        );
        console.log(userSnapshot);
        console.log(userSnapshot.data())
        
    }catch(error){
        yield put(signInFailure(error))

    }
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
    } catch(error){

    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION,
        getSnapshotFromUserAuth)
}

export function* userSagas() {
    yield all ([call(onCheckUserSession)])
}