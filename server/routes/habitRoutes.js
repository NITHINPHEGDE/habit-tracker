import express from "express"
import { getHabits, createHabit, deleteHabit, updateHabitLog } from "../controllers/habitController.js"
import { protect } from "../config/middleware/authMiddleware.js"

const router = express.Router()

router.get("/", protect, getHabits)
router.post("/", protect, createHabit)
router.delete("/:id", protect, deleteHabit)
router.put("/:id/log", protect, updateHabitLog)

export default router