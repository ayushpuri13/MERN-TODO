const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const hostname = "127.0.0.1";
const port = 9000;

var todoList = [
  { id: 1, todo: "Study", completed: false },
  { id: 2, todo: "Watch Tv", completed: false },
  { id: 3, todo: "Read a book", completed: false },
];

app.get("/", function (req, res) {
  res.status(200).json({ ack: 1, Todo: todoList });
});

app.post("/", (req, res) => {
  console.log(req.body);
  var y = todoList.push(req.body);
  console.log(todoList);
  res.status(200).json({ ack: 1, Todo: todoList });
});

app.delete("/", (req, res) => {
  console.log(req.body);

  var y = 0;
  todoList.map((x, i) => {
    if (x.id == req.body.id) y = todoList.splice(i, 1);
  });
  console.log("deleted", y);
  res.status(200).json({ ack: 1, Todo: todoList });
});

app.put("/", (req, res) => {
  todoList.map((x, i) => {
    if (x.id == req.body.id) {
      x.completed = req.body.completed;
      x.todo = req.body.todo;
      console.log(x.id, "put called");
    }
  });
  res.status(200).json({ ack: 1, Todo: todoList });
});

// const server = http.createServer((req, res) => {
//   });

app.listen(port, () => console.log("Server running at http://127.0.0.1:9000"));
