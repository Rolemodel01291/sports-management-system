import firebase from 'react-native-firebase';

export function InsertUser (uid,data) {
    console.log("---------------------------------------------")
    firebase.database().ref(`user/${uid}`).set({
        email:data.email,
        password:data.password
    })
}