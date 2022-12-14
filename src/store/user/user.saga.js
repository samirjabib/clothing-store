import {all, takeLatest, put, call } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types'
import { 
    signInSuccess,
    signInFailed,
    signUpSuccess,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
}
from './user.action';

import { 
    createAuthUserWithEmailAndPassword, 
    getCurrentUser, 
    signInAuthUserWithEmailAndPassword, 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signOutUser
} from '../../utils/firebase/firebase.utils';


export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
      const userSnapshot = yield call(
        createUserDocumentFromAuth,
        userAuth,
        additionalDetails
      );
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
      yield put(signInFailed(error));
    }
  }

export function* signUp({ payload: { email, password, displayName } }) {
    try {
      const { user } = yield call(
        createAuthUserWithEmailAndPassword,
        email,
        password
      );
      yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
      yield put(signUpFailed(error));
    }
  }

export function* signInWithGoogle() {
    try{
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    }catch(error){
        yield put(signInFailed(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield call(
        signInAuthUserWithEmailAndPassword,
        email,
        password
      );
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(signInFailed(error));
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

export function* signOut(){
  try{
    yield call(signOutUser);
    yield put(signOutSuccess());
  }catch(error){
    yield put(signOutFailed(error));
  }
}

export function* signUpStart(){
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}


export function* onGoogleSignStart(){
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAunthenticated )
};

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart(){
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}


export function* userSagas(){
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignStart), 
        call(onEmailSignInStart),
        call(signUpStart),
        call(onSignOutStart),
    ]);
};