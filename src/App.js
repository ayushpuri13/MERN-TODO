import Navbar1 from "./components/navbar";
import Todo from "./components/todoList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button, FormControl } from "react-bootstrap";
import React, { useState } from "react";
import { useEffect } from "react";
import Environment from "./Environment";

function App() {
 
  ////styles

  const styles = {
    addTodo: {
      justifyContent: "center",
      display: "flex",
      marginTop: "2%",
    },

    addTodoCard: {
      width: "38rem",
      justifyContent: "center",
    },

    todoList: {
      justifyContent: "center",
      display: "flex",
      marginTop: "2%",
    },
    todoListCard: {
      width: "38rem",
      justifyContent: "center",
    },

    addButton: {
      justifyContent: "center",
      display: "flex",
      marginTop: "2%",
    },
  };

  ////variables declaration

  var flag = Math.floor(Math.random() * 1000000 + 1);
  const [todoList, setTodo] = React.useState([]);
  var [add, setAdd] = React.useState(true);
  var [toEdit, setToEdit] = React.useState({});
  var [title, setTitle] = React.useState("");

  useEffect(() => {
    getTodo();
    setAdd(true);
  }, []);

  ////functions && Components

  function getTodo() {
    console.log("get fun");
    fetch(Environment.CLIENT_API + "/", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Todo);
        setTodo(data.Todo);
      });
  }

  ////function to update completed or ucompleted todo status

  function updateStatus(id) {
    todoList.map((x, i) => {
      if (x.id == id) {
        console.log(x);
        fetch(Environment.CLIENT_API + "/", {
          method: "PUT",
          body: JSON.stringify(x),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTodo(data.Todo);
            setToEdit({});
            setTitle("");
          });
      }
    });
  }

  function updateTodo() {
    console.log(title);
    setAdd(true);

    console.log(toEdit);
    var x = { id: toEdit.id, todo: title, completed: toEdit.completed };
    console.log(x);
    fetch(Environment.CLIENT_API + "/", {
      method: "PUT",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodo(data.Todo);
        setToEdit({});
        setTitle("");
      });
  }

  function addTodo() {
    var x = { id: flag + 1, todo: title, completed: false };
    console.log(todoList, JSON.stringify(x));

    fetch(Environment.CLIENT_API + "/", {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodo(data.Todo);
        setTitle("");
      });
  }

  function delTodo(id) {
    fetch(Environment.CLIENT_API + "/", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function handleCallback(id, operation) {
    console.log(id, operation);
    if (operation == "delete") deleteTodo(id);
    else if (operation == "edit") editTodo(id);
    else updateStatus(id);
  }

  function editTodo(id) {
    console.log("edit called");
    setAdd(false);
    setTodo([...todoList]);
    todoList.map((x, i) => {
      if (x.id == id) {
        setTitle(x.todo);
        setToEdit(x);
      }
    });
  }

  function deleteTodo(id) {
    if (window.confirm("Are you sure you want to delete?")) {
      console.log(id);
      var y = 0;
      todoList.map((x, i) => {
        if (x.id == id) y = todoList.splice(i, 1);
        setTodo([...todoList]);
        delTodo(id);
      });
      console.log("deleted", y);
    }
  }

  return (
    <div>
      <Navbar1> </Navbar1>
      <br></br>
      <div style={styles.addTodo}>
        <Card body style={styles.addTodoCard}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <div style={styles.addButton}>
              {add ? (
                <Button variant="primary" onClick={addTodo}>
                  ADD
                </Button>
              ) : (
                <Button variant="primary" onClick={updateTodo}>
                  EDIT
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </div>
      <div style={styles.todoList}>
        <Card body style={styles.todoListCard}>
          {todoList.map((x, i) => (
            <Todo key={x.id} List={x} pCallback={handleCallback}></Todo>
          ))}
        </Card>
      </div>
    </div>
  );
}

export default App;
