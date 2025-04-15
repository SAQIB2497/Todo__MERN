import Todo from "../models/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = new Todo({
      title,
      description,
      user: req.user._id,
    });

    await newTodo.save();
    res.status(201).json({ message: "Todo created", Todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const { id } = req.params;

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo updated", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or unauthorized" });
    }

    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};
