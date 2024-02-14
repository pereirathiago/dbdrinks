import { CreateTipoController } from "@modules/drinks/use-cases/tipo/create-tipo/create-tipo-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListTiposController } from "@modules/drinks/use-cases/tipo/list-tipo/list-tipo-controller";
import { CountTipoController } from "@modules/drinks/use-cases/tipo/count-tipo/count-tipo-controller";
import { SelectTipoController } from "@modules/drinks/use-cases/tipo/select-tipo/select-tipo-controller";
import { IdSelectTipoController } from "@modules/drinks/use-cases/tipo/id-select-tipo/id-select-tipo-controller";
import { GetTipoController } from "@modules/drinks/use-cases/tipo/get-tipo/get-tipo-controller";
import { UpdateTipoController } from "@modules/drinks/use-cases/tipo/update-tipo/update-tipo-controller";
import { DeleteTipoController } from "@modules/drinks/use-cases/tipo/delete-tipo/delete-tipo-controller";
import { MultiDeleteTipoController } from "@modules/drinks/use-cases/tipo/multi-delete-tipo/multi-delete-tipo-controller";

const tipoRoutes = Router()

const createTipoController = new CreateTipoController()
const listTipoController = new ListTiposController()
const countTipoController = new CountTipoController()
const selectTipoController = new SelectTipoController()
const idSelectTipoController = new IdSelectTipoController()
const getTipoController = new GetTipoController()
const updateTipoController = new UpdateTipoController()
const deleteTipoController = new DeleteTipoController()
const multiDeleteTipoController = new MultiDeleteTipoController()

tipoRoutes.post('/', ensureAuthenticated, createTipoController.handle)
tipoRoutes.post('/list', ensureAuthenticated, listTipoController.handle)
tipoRoutes.post('/count', ensureAuthenticated, countTipoController.handle)
tipoRoutes.get('/select/:id', ensureAuthenticated, idSelectTipoController.handle)
tipoRoutes.get('/select', ensureAuthenticated, selectTipoController.handle)
tipoRoutes.get('/:id', ensureAuthenticated, getTipoController.handle)
tipoRoutes.put('/:id', ensureAuthenticated, updateTipoController.handle)
tipoRoutes.delete('/:id', ensureAuthenticated, deleteTipoController.handle)
tipoRoutes.delete('/', ensureAuthenticated, multiDeleteTipoController.handle)

export { tipoRoutes }