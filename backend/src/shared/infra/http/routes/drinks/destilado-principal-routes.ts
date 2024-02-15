import { CreateDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/create-destilado-principal/create-destilado-principal-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListDestiladoPrincipalsController } from "@modules/drinks/use-cases/destilado-principal/list-destilado-principal/list-destilado-principal-controller";
import { CountDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/count-destilado-principal/count-destilado-principal-controller";
import { SelectDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/select-destilado-principal/select-destilado-principal-controller";
import { IdSelectDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/id-select-destilado-principal/id-select-destilado-principal-controller";
import { GetDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/get-destilado-principal/get-destilado-principal-controller";
import { UpdateDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/update-destilado-principal/update-destilado-principal-controller";
import { DeleteDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/delete-destilado-principal/delete-destilado-principal-controller";
import { MultiDeleteDestiladoPrincipalController } from "@modules/drinks/use-cases/destilado-principal/multi-delete-destilado-principal/multi-delete-destilado-principal-controller";

const destiladoPrincipalRoutes = Router()

const createDestiladoPrincipalController = new CreateDestiladoPrincipalController()
const listDestiladoPrincipalController = new ListDestiladoPrincipalsController()
const countDestiladoPrincipalController = new CountDestiladoPrincipalController()
const selectDestiladoPrincipalController = new SelectDestiladoPrincipalController()
const idSelectDestiladoPrincipalController = new IdSelectDestiladoPrincipalController()
const getDestiladoPrincipalController = new GetDestiladoPrincipalController()
const updateDestiladoPrincipalController = new UpdateDestiladoPrincipalController()
const deleteDestiladoPrincipalController = new DeleteDestiladoPrincipalController()
const multiDeleteDestiladoPrincipalController = new MultiDeleteDestiladoPrincipalController()

destiladoPrincipalRoutes.post('/', ensureAuthenticated, createDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.post('/list', ensureAuthenticated, listDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.post('/count', ensureAuthenticated, countDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.get('/select/:id', ensureAuthenticated, idSelectDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.get('/select', ensureAuthenticated, selectDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.get('/:id', ensureAuthenticated, getDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.put('/:id', ensureAuthenticated, updateDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.delete('/:id', ensureAuthenticated, deleteDestiladoPrincipalController.handle)
destiladoPrincipalRoutes.delete('/', ensureAuthenticated, multiDeleteDestiladoPrincipalController.handle)

export { destiladoPrincipalRoutes }