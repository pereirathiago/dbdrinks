import { CreateTipoController } from "@modules/drinks/use-cases/tipo/create-tipo/create-tipo-controller";
import e, { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";

const tipoRoutes = Router()

const createTipoController = new CreateTipoController()

tipoRoutes.post('/', ensureAuthenticated, createTipoController.handle)

export { tipoRoutes }