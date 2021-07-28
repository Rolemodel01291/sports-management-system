
import { delay, takeEvery, takeLatest, put, call, take } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import {insertUser} from '../services/firebaseServices'
import { eventChannel } from 'redux-saga';

const database = firebase.database();
function* signUpAsync(action) {
  try {
    const auth = firebase.auth()    
    const result = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.value.email,
      action.value.password
    )    
    yield put({ type: 'SIGN_UP_SUCCESS', value: action.value});
  }
  catch (error) {
    yield put({ type: 'SIGN_UP_ERROR', value: error});
    console.log(error);
  }
};

export function* watchSignup() {
  yield takeLatest('SIGN_UP', signUpAsync);
};

function* loginAsync(action) {
  try {

    const auth = firebase.auth()    
    const result = yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.value.email,
      action.value.password
    )

    firebase.database().ref(`user/${result.user.uid}`).set({
        email:action.value.email,
        password:action.value.password
    })
    const data = {
      email: action.value.email,
      password:action.value.password,
      uid:result.user.uid
    }
    console.log("==============", result)
    yield put({ type: 'LOG_IN_SUCCESS', value: data, });
  }
  catch (error) {
    console.log(error);
  }
};

export function* watchDecreaseCounter() {

  yield takeLatest('LOG_IN', loginAsync);
};


function* addProfileAsync(action) {
  try {

    firebase.database().ref(`members/${action.value.uid}`).set({
        name:action.value.name,
        imgUrl:action.value.firstImg,
        height:action.value.height,
        weight:action.value.weight,
        age: action.value.age,
        guard:action.value.guard,
        uid:action.value.uid
    }) 
    firebase.database().ref(`members/${action.value.uid}/attend/${action.value.month}`).set({
      absent:'0',
      present:'0',     
  })   
      yield put({ type: 'ADD_PROFILE_SUCCESS', value: {state:"Success"}, }); 
  }
  catch (error) {
    yield put({ type: 'ADD_PROFILE_ERROR', value: error, });
  }
};

export function* watchAddProfile() {

  yield takeLatest('ADD_PROFILE', addProfileAsync);
};


function createEventChannel() {
  const listener = eventChannel(
      emit => {
          database.ref('members/')
          .on('child_added', data => emit(data.val())); 
        return () => database.ref('items').off(listener);
      }
  );
  
  return listener;
};

function* getProfileAsync(action) {
  // const updateChannel = createEventChannel();
  // const data = []
  // while(true) {
  //     const item = yield take(updateChannel);      
  //     data.push(item)
  //     console.log("------------------------------------------------",data)
  //     yield put({ type: 'GET_PROFILE_SUCCESS', value: data }); 
  // }
var roomRef = firebase.database().ref('/members/')
var rooms = yield call(function() {
  return new Promise(function(resolve, reject) {
    roomRef.once('value', function (snap) {
      var rooms = []
      var roomkeys = snap.val()
      for (var roomkey in roomkeys) {
        firebase.database().ref('/members/' + roomkey).once('value', function (item) {
          
          rooms.push(item.val())
        })
      }
      resolve(rooms)
    })
  })
})
console.log("----------------------------ddddd--------------------",rooms)
yield put({ type: 'GET_PROFILE_SUCCESS', value: rooms });   
  
};

export function* watchGetProfile() {

  yield takeLatest('GET_PROFILE', getProfileAsync);
};

