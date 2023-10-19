import { Router, Request, Response, NextFunction } from "express";
import taskRoutes from "./task.routes";

const routes = Router();

routes
    .get("/", (_req: Request, res: Response) => res.send("Server running success!"));

routes.use("/tasks", taskRoutes);

//TRATAMENTO PARA ROTAS INVALIDAS
routes
    .get('*', (req: Request, res: Response, next: NextFunction) => { return res.status(404).json({ message: `Não existe rota para a requisição solicitada ${req.url}, verifique.` }) })
    .post('*', (req: Request, res: Response, next: NextFunction) => { return res.status(404).json({ message: `Não existe rota para a requisição solicitada ${req.url}, verifique.` }) });

export default routes;