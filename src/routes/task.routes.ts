import { Router } from "express";
import { postTask, findTask, putTask, deleteTask, patchTask } from "../controllers/task.controllers";

const taskRoutes = Router();

taskRoutes
  .post("", postTask)
  .get("", findTask)
  .put("/:id", putTask)
  .delete("/:id", deleteTask)
  .patch("/:id/complete", patchTask)

export default taskRoutes;