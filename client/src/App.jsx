import { useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import "./App.css";

function App() {
  const [isItem, setIsItem] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const GetTodos = () => {
    fetch("http://localhost:3001/todo")
      .then((res) => res.json())
      .then((data) => setIsItem(data))
      .catch((error) => console.log(error));
  };

  //ADD ITEM
  const addItem = async () => {
    try {
      if (!input) throw new Error("Please enter something...");
      const data = await fetch("http://localhost:3001/todo/new", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add an item");
        }
        return res.json();
      });
      console.log("Data received from server:", data);
      setIsItem((prevItems) => [...prevItems, data]);
      setInput("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[60vw] h-[80vh] flex flex-col p-[10px] items-start gap-[30px]">
        <h1>Todo</h1>
        <div className="w-full flex gap-[10px]">
          <input
            value={input}
            type="text"
            onChange={handleChange}
            placeholder="Enter your todo"
            id="text-input"
            className="w-full px-[20px] rounded-md"
          />
          <button
            type="submit"
            onClick={addItem}
            className="bg-[#646cff] button">
            Add
          </button>
        </div>
        <div className="todoList w-full h-full overflow-y-scroll flex flex-col gap-[10px]">
          {Array.isArray(isItem) && isItem.length > 0 ? (
            isItem.map((item, key) => (
              <TodoItem
                key={key}
                name={item.name}
                id={item._id}
                setIsItem={setIsItem}
              />
            ))
          ) : (
            <p className="text-[24px]">No items found</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
