const express = require("express");
const app = express();
app.use(express.json());



app.use("/", express.static("public"));
const getTasks = require("./routes/getTasks")
app.use("/getTasks", getTasks);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});