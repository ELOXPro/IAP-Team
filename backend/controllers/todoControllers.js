import Todo from "../models/Todo.js";

// Create
export const CreateTodo = async (req, res) => {
  const { text, email } = req.body;

  try {
    const todo = await Todo.create({
      text,
      email,
    });

    res.json(todo);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Get
export const GetTodosByUser = async (req, res) => {
  try {
    const todos = await Todo.find({
      email: req.params.email,
    });

    console.log(todos)

    res.json(todos);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Delete
export const DeleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

// Toggle
export const ToggleTodo = async (req, res) => {
  try {
  const todo = await Todo.findById(req.params.id);

  todo.completed = !todo.completed;
  await todo.save();

  res.json(todo);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
