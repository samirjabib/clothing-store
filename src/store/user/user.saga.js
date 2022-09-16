import {all, takeLatest, put, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types'
import { signInSuccess, signInFailed } from './user.action';

import { createUserDocumentFromAuth, getCurrentUser } from '../../utils/firebase/firebase.utils';



export function* getSnapshotFromUserAuth(userAuth, additionalDetails){
    try{
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        console.log(userSnapShot)
        console.log(userSnapShot.data())
    }catch(error){
        yield put(signInFailed(error))
    }
}


export function* isUserAunthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)

    }catch(error){
        yield put(signInFailed(error))
    }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAunthenticated )
};


export function* userSagas(){
    yield([onCheckUserSession])
};