import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { Database } from "@/config/database";

const database = new Database();

interface Task {
  id: string;
  title: string;
  description: string;
  completed_at: string | null;
  created_at: Date | number;
  updated_at: Date | number;
}

export async function postTask(req: Request, res: Response) {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.writeHead(400).end(
        JSON.stringify({ message: 'title is required' }),
      )
    }

    if (!description) {
      return res.writeHead(400).end(
        JSON.stringify({message: 'description is required' })
      )
    }

    const task: Task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    database.insert("tasks", task);

    return res.writeHead(201).end();
  } catch (error) {
    return res.status(404).send(error);
  }
}

export async function findTask(req: Request, res: Response) {
  try {
    const { title, description } = req.query;

    const tasks = database.select(
      "tasks",
      title || description ? req.query : null
    );

    return res.end(JSON.stringify(tasks));
  } catch (error) {
    console.log("error:", error);
    return res.status(404).send(error);
  }
}

export async function putTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const { title, description } = req.body;

    if (!title && !description) {
      return res.writeHead(400).end(
        JSON.stringify({ message: 'title and description is required' }),
      )
    }

    const taskById = database.select("tasks", req.params);

    if (!Boolean(taskById.length)) {
      return res.writeHead(404).end('Registro não existe!');
    }

    const data = {...req.body, updated_at: Date.now()}

    const task = database.update("tasks", id, data);
    

    return res.end(JSON.stringify(task));
  } catch (error) {
    console.log("error:", error);
    return res.status(404).send(error);
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const taskById = database.select("tasks", req.params);

    if (!Boolean(taskById.length)) {
      return res.writeHead(404).end();
    }

    const task = database.delete("tasks", id);

    return res.end(JSON.stringify(task));
  } catch (error) {
    console.log("error:", error);
    return res.status(404).send(error);
  }
}

export async function patchTask(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const taskById = database.select("tasks", req.params);

    if (!Boolean(taskById.length)) {
      return res.writeHead(404).end('Registro não existe!');
    }

    const data = {...taskById[0], completed_at : Date.now()}

    const task = database.update("tasks", id, data);

    return res.writeHead(200).end();
  } catch (error) {
    return res.status(404).send(error);
  }
}