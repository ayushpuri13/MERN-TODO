import { Button, Card } from "react-bootstrap";

import { PencilFill } from "react-bootstrap-icons";
import { TrashFill } from "react-bootstrap-icons";

function Todo(props) {
  function deleteCallback(event) {
    props.pCallback(props.List.id, "delete");
    event.preventDefault();
  }

  function editCallback(event) {
    props.pCallback(props.List.id, "edit");
    event.preventDefault();
  }

  function onComplete(event) {
    console.log(props.List.completed);
    props.List.completed = !props.List.completed;
    console.log(props.List.completed);
    event.preventDefault();
    props.pCallback(props.List.id, "update");
  }

  return (
    <div>
      <Card
        body
        style={{ marginTop: "1%", color: "#0d6efd", cursor: "pointer" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {props.List.completed ? (
            <div
              onClick={onComplete}
              style={{
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }}
            >
              {props.List.todo}
            </div>
          ) : (
            <div onClick={onComplete}>{props.List.todo}</div>
          )}

          <div
            style={{
              width: "20%",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Button onClick={editCallback}>
              <PencilFill />
            </Button>
            <Button onClick={deleteCallback}>
              <TrashFill />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Todo;
