const { Router } = require("express");
const router = new Router();
const { db } = require("../firebaseInit");

router.put("/:id", async (req, res) => {
    try {
        let taskToUpdate = await db.collection("tasks").where("id", "==", parseInt(req.params.id)).get();

        taskToUpdate.forEach(task => {
            task.ref.update(req.body);
        });
        res.send({ msg: "Task updated" });
        
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;