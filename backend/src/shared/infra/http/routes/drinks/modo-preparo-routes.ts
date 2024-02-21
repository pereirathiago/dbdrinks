import { CreateModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/create-modo-preparo/create-modo-preparo-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListModoPreparosController } from "@modules/drinks/use-cases/modo-preparo/list-modo-preparo/list-modo-preparo-controller";
import { CountModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/count-modo-preparo/count-modo-preparo-controller";
import { SelectModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/select-modo-preparo/select-modo-preparo-controller";
import { IdSelectModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/id-select-modo-preparo/id-select-modo-preparo-controller";
import { GetModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/get-modo-preparo/get-modo-preparo-controller";
import { UpdateModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/update-modo-preparo/update-modo-preparo-controller";
import { DeleteModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/delete-modo-preparo/delete-modo-preparo-controller";
import { MultiDeleteModoPreparoController } from "@modules/drinks/use-cases/modo-preparo/multi-delete-modo-preparo/multi-delete-modo-preparo-controller";

const modoPreparoRoutes = Router()

const createModoPreparoController = new CreateModoPreparoController()
const listModoPreparoController = new ListModoPreparosController()
const countModoPreparoController = new CountModoPreparoController()
const selectModoPreparoController = new SelectModoPreparoController()
const idSelectModoPreparoController = new IdSelectModoPreparoController()
const getModoPreparoController = new GetModoPreparoController()
const updateModoPreparoController = new UpdateModoPreparoController()
const deleteModoPreparoController = new DeleteModoPreparoController()
const multiDeleteModoPreparoController = new MultiDeleteModoPreparoController()

modoPreparoRoutes.post('/', ensureAuthenticated, createModoPreparoController.handle)
modoPreparoRoutes.post('/list', ensureAuthenticated, listModoPreparoController.handle)
modoPreparoRoutes.post('/count', ensureAuthenticated, countModoPreparoController.handle)
modoPreparoRoutes.get('/select/:id', ensureAuthenticated, idSelectModoPreparoController.handle)
modoPreparoRoutes.get('/select', ensureAuthenticated, selectModoPreparoController.handle)
modoPreparoRoutes.get('/:id', ensureAuthenticated, getModoPreparoController.handle)
modoPreparoRoutes.put('/:id', ensureAuthenticated, updateModoPreparoController.handle)
modoPreparoRoutes.delete('/:id', ensureAuthenticated, deleteModoPreparoController.handle)
modoPreparoRoutes.delete('/', ensureAuthenticated, multiDeleteModoPreparoController.handle)

export { modoPreparoRoutes }