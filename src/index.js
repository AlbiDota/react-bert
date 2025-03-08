import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  
);

//firebase backend stuff
const functions = require("firebase-functions");
const Filter = require("bad-words");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (doc,ctx) => {

        const filter= new Filter();
        const {text, uid} = doc.data();

        if (filter.isProfane(text)) {
            const cleaned = filter.clean(text);
            await doc.ref.update({text:"banned for saying - ${cleaned}"});

            await db.collection("banned").doc(uid).set({});
        }


    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
