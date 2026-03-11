import Habit from "../models/Habit.js"

function serializeHabit(habit){
  const obj=habit.toObject()
  obj.logs=habit.logs ? Object.fromEntries(habit.logs) : {}
  return obj
}

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id })
    res.json(habits.map(serializeHabit))
  } catch (error) {
    console.error("getHabits error:",error)
    res.status(500).json({ message: "Failed to fetch habits" })
  }
}

export const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      user: req.user._id
    })
    res.json(serializeHabit(habit))
  } catch (error) {
    console.error("createHabit error:",error)
    res.status(500).json({ message: "Failed to create habit" })
  }
}

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id)
    if (!habit) return res.status(404).json({ message: "Habit not found" })
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }
    await Habit.findByIdAndDelete(req.params.id)
    res.json({ message: "Habit deleted" })
  } catch (error) {
    console.error("deleteHabit error:",error)
    res.status(500).json({ message: "Failed to delete habit" })
  }
}

export const updateHabitLog = async (req, res) => {
  try {
    const { date, value } = req.body
    const habit = await Habit.findById(req.params.id)
    if (!habit) return res.status(404).json({ message: "Habit not found" })
    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    // Initialize logs if undefined (old habits created before logs field existed)
    if (!habit.logs) habit.logs = new Map()

    if (value === null || value === undefined || value === 0 || value === false) {
      habit.logs.delete(date)
    } else {
      habit.logs.set(date, value === true ? 1 : value)
    }
    await habit.save()
    res.json(serializeHabit(habit))
  } catch (error) {
    console.error("updateHabitLog error:",error)
    res.status(500).json({ message: "Failed to update log" })
  }
}
