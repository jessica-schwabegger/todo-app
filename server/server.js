const express = require("express");
const app = express();
app.use(express.json());

app.use("/", express.static("public"));
const getTasks = require("./routes/getTasks")
app.use("/getTasks", getTasks);
const addNewTask = require("./routes/addNewTask")
app.use("/addNewTask", addNewTask);
const updatePosition = require("./routes/updatePosition")
app.use("/updatePosition", updatePosition);
const deleteTask = require("./routes/deleteTask")
app.use("/deleteTask", deleteTask);
const updateTask = require("./routes/updateTask")
app.use("/updateTask", updateTask);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});