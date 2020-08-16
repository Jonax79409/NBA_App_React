import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCG4Fjkfqxaj-_pircw_3YV72C1q0u1n4M",
    authDomain: "nba-full-436d3.firebaseapp.com",
    databaseURL: "https://nba-full-436d3.firebaseio.com",
    projectId: "nba-full-436d3",
    storageBucket: "nba-full-436d3.appspot.com",
    messagingSenderId: "792836456520",
    appId: "1:792836456520:web:0e61133968337703cd187d",
    measurementId: "G-46XE9GTRGW"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref ('teams');
const firebaseVideos = firebaseDB.ref ('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach ((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id:childSnapshot.key
        })
    })
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseVideos,
    firebaseTeams,
    firebaseArticles,
    firebaseLooper
}