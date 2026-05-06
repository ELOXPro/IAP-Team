import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

function TodoApp() {
  const { user } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API = "http://localhost:3000/todos";

  useEffect(() => {
    fetch(`${API}/${user.email}`)
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;

    const res = await fetch(`${API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, email: user.email }),
    });

        console.log(res);
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    setTodos(todos.filter((t) => t._id !== id));
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/todos/${id}`, {
      method: "PUT",
    });

    const updated = await res.json();

    setTodos(todos.map((t) => (t._id === id ? updated : t)));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-800">Todo App</h1>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-800"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
          />

          <button
            onClick={addTodo}
            className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {todos.length === 0 && (
            <p className="text-center text-sm text-zinc-400">No tasks yet 👀</p>
          )}

          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-zinc-100 px-3 py-2 rounded-lg hover:bg-zinc-200 transition"
            >
              <span
                onClick={() => toggleTodo(todo._id)}
                className={`text-sm cursor-pointer flex-1 ${
                  todo.completed
                    ? "line-through text-zinc-400"
                    : "text-zinc-800"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="ml-2 text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
