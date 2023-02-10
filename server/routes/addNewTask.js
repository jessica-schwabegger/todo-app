const { Router } = require("express");
const router = new Router();
const { db } = require("../firebaseInit");

router.post("/", async (req, res) => {
    let tasks = [];

    try {
        let snapShot = await db.collection("tasks").get();

        snapShot.forEach(doc => {
            tasks.push(doc.data());
        });

        db.collection("tasks").doc().set({
            taskText: req.body.taskText,
            isDone: false,
            inProgress: false,
            id: Math.floor(Math.random() * 1000000000),
            index: tasks.length,
        })
        res.send({ message: "New task added"});
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;