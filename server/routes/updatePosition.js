const { Router } = require("express");
const router = new Router();
const { db } = require("../firebaseInit");

router.put("/:id/:sourceIndex/:destinationIndex", async (req, res) => {
    try {
        let tasks = [];
        let snapShot = await db.collection("tasks").orderBy("index").get();

        snapShot.forEach(task => {
            tasks.push(task.data());
        });
        
        //Temporary list to update position of task, then use ID to find same task in db. Then update to same index. 
        const newItems = [...tasks];
        const [removed] = newItems.splice(Number(req.params.sourceIndex), 1);
        newItems.splice(Number(req.params.destinationIndex), 0, removed);
        
        for (let i = 0; i < newItems.length; i++) {
            newItems[i].index = i;

            snapShot.forEach(doc => {
                let data = doc.data();
                if(newItems[i].id == data.id) {
                    doc.ref.update({index: i});
                }
            });
        }
        res.send({ msg: "Task position updated" });

    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;