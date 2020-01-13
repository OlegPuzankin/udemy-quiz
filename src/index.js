import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from "./store/reduxStore";
import firebase from  'firebase/app'
import 'firebase/database'



const firebaseConfig = {
    apiKey: "AIzaSyBBsFmtI-c5CZnDdvDab1kFgQLz3aH8DHA",
    authDomain: "quiz-react-demo.firebaseapp.com",
    databaseURL: "https://quiz-react-demo.firebaseio.com",
    projectId: "quiz-react-demo",
    storageBucket: "quiz-react-demo.appspot.com",
    messagingSenderId: "1092178669672",
    appId: "1:1092178669672:web:91b00b91d7f04de2398bdd"
};
firebase.initializeApp(firebaseConfig);

debugger
const database = firebase.database();
console.log(database);
debugger


function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

writeUserData(1, 'oleg', 'olegp@comtel.ua', 'none');



const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
