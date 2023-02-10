const { Router } = require("express");
const router = new Router();
const { db } = require("../firebaseInit");

router.get("/", async (req, res) => {
    try {
        let tasks = [];
        let snapShot = await db.collection("tasks").orderBy("index").get();

        snapShot.forEach(task => {
            tasks.push(task.data());
        });
        res.send({ tasks: tasks });
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;