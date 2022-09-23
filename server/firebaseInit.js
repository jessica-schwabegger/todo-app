let admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-app-44be1.firebaseio.com"
});

let db = admin.firestore();


// //Init data for database

// const arrayOfTodos = [
//     {
//         "taskText": "Köpa mjölk",
//         "isDone": false
//     },
//     {
//         "taskText": "Städa inför partajet",
//         "isDone": false
//     },
//     {
//         "taskText": "Klippa gräsmattan",
//         "isDone": true
//     },
//     {
//         "taskText": "Rensa ut sommarkläderna från garderoben",
//         "isDone": false
//     },
//     {
//         "taskText": "Laga en trevlig fredagsmiddag",
//         "isDone": true
//     }
// ];
// //Run "node firebaseInit.js" to init to db
// arrayOfTodos.forEach(task => {
//     db.collection("tasks").add(task)
// })

module.exports = { db };