const { Router } = require("express");
const router = new Router();
const { db } = require("../firebaseInit");

router.delete("/:id", async (req, res) => {
    try {
        console.log("in router");
        let taskToDelete = await db.collection("tasks").where("id", "==", parseInt(req.params.id)).get();

        taskToDelete.forEach(task => {
            task.ref.delete();
        });
        res.send({ msg: "Task deleted" });
        
    } catch(err) {
        res.send(err);
    }
});

module.exports = router;