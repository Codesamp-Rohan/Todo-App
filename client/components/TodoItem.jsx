import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function TodoItem({ name, id, setIsItem }) {
  const [newName, setNewName] = useState(name);
  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  const deleteTodo = async () => {
    try {
      const response = await fetch("http://localhost:3001/todo/delete/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete a task.");
      }
      const data = await response.json();
      setIsItem((prevItems) =>
        prevItems.filter((item) => item._id !== data._id)
      );
    } catch (error) {
      console.log("Error deleting task", error);
    }
  };

  // Update
  const updateItem = async () => {
    try {
      const response = await fetch("http://localhost:3001/todo/update/" + id, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the item");
      }
      // Assuming the response from the server is the updated item
      const updatedItem = await response.json();
      setIsItem((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    } catch (error) {
      console.log("Error updating the item", error);
    }
    setUpdate(false);
  };

  return (
    <>
      <div className="todo-item rounded-md w-[100%]">
        {update ? (
          <input
            type="text"
            value={newName}
            onChange={handleChange}
            placeholder="edit"
            className="item-update-input"
          />
        ) : (
          <h2>{name}</h2>
        )}
        <span className="btn-area flex">
          {update ? (
            <>
              <button
                onClick={updateItem}
                className="delete-button tick-button">
                <img
                  src="../public/check.png"
                  className="button-image"
                  alt="icon"></img>
              </button>
              <button
                onClick={() => setUpdate(false)}
                className="delete-button delete-button">
                <img
                  src="../public/cross-button.png"
                  className="button-image"
                  alt="icon"></img>
              </button>
            </>
          ) : (
            <button
              onClick={handleUpdate}
              className="delete-button update-button">
              <img
                src="../public/pen.png"
                className="button-image"
                alt="icon"></img>
            </button>
          )}
          <button onClick={deleteTodo} className="delete-button">
            <img
              src="../public/delete.png"
              className="button-image"
              alt="icon"></img>
          </button>
        </span>
      </div>
    </>
  );
}
