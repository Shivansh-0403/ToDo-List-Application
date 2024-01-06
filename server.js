import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");

const todoSchema = new mongoose.Schema({
  heading: String,
  task: String,
});

const Task = mongoose.model("Task", todoSchema);
var editTask = null;

app.get("/", async (req, res) => {
  try {
    // Execute the query and wait for the result
    const taskarr = await Task.find({});

    // Render view with the retrieved data
    if (editTask === null) {
      res.render("index.ejs", { tasksArray: taskarr });
    } else {
      res.render("index.ejs", { tasksArray: taskarr, toEditTask: editTask });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", (req, res) => {
  var head = req.body["heading"];
  var detail = req.body["detail"];

  const todoTask = new Task({
    heading: head,
    task: detail,
  });

  const taskArray = [todoTask];

  try {
    const insertedTask = Task.insertMany(taskArray);
    console.log("Users inserted successfully:", insertedTask);
  } catch (error) {
    console.error("Error inserting users:", error.message);
  }

  editTask = null;
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const taskId = req.body["delete"];

  try {
    // Use Mongoose to delete tasks by their IDs
    const result = await Task.deleteMany({ _id: { $in: taskId } });

    if (result.deletedCount > 0) {
      console.log("Success");
      editTask = null;
      res.redirect("/");
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/edit", async (req, res) => {
  const itemId = req.body["edit"];

  try {
    // Find the element by _id
    const foundItem = await Task.findById(itemId);

    if (!foundItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    editTask = foundItem;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/edit:done", async (req, res) => {
  var head = req.body["editContentHeading"];
  var det = req.body["editContentDetail"];
  var itemId = req.body["submitEdit"];

  try {
    // Find the item by ID and update it
    const updatedItem = await Task.findByIdAndUpdate(
      itemId,
      { heading: head, task: det },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    editTask = null;
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("Listening on port " + 3000);
  console.log("http://localhost:3000/");
});
