import { CreateTipoController } from "@modules/drinks/use-cases/tipo/create-tipo/create-tipo-controller";
import e, { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListTiposController } from "@modules/drinks/use-cases/tipo/list-tipo/list-tipo-controller";

const tipoRoutes = Router()

const createTipoController = new CreateTipoController()
const listTipoController = new ListTiposController()

tipoRoutes.post('/', ensureAuthenticated, createTipoController.handle)
tipoRoutes.post('/list', ensureAuthenticated, listTipoController.handle)

export { tipoRoutes }