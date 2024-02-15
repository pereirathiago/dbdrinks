import { CreateDicaController } from "@modules/drinks/use-cases/dica/create-dica/create-dica-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListDicasController } from "@modules/drinks/use-cases/dica/list-dica/list-dica-controller";
import { CountDicaController } from "@modules/drinks/use-cases/dica/count-dica/count-dica-controller";
import { SelectDicaController } from "@modules/drinks/use-cases/dica/select-dica/select-dica-controller";
import { IdSelectDicaController } from "@modules/drinks/use-cases/dica/id-select-dica/id-select-dica-controller";
import { GetDicaController } from "@modules/drinks/use-cases/dica/get-dica/get-dica-controller";
import { UpdateDicaController } from "@modules/drinks/use-cases/dica/update-dica/update-dica-controller";
import { DeleteDicaController } from "@modules/drinks/use-cases/dica/delete-dica/delete-dica-controller";
import { MultiDeleteDicaController } from "@modules/drinks/use-cases/dica/multi-delete-dica/multi-delete-dica-controller";

const dicaRoutes = Router()

const createDicaController = new CreateDicaController()
const listDicaController = new ListDicasController()
const countDicaController = new CountDicaController()
const selectDicaController = new SelectDicaController()
const idSelectDicaController = new IdSelectDicaController()
const getDicaController = new GetDicaController()
const updateDicaController = new UpdateDicaController()
const deleteDicaController = new DeleteDicaController()
const multiDeleteDicaController = new MultiDeleteDicaController()

dicaRoutes.post('/', ensureAuthenticated, createDicaController.handle)
dicaRoutes.post('/list', ensureAuthenticated, listDicaController.handle)
dicaRoutes.post('/count', ensureAuthenticated, countDicaController.handle)
dicaRoutes.get('/select/:id', ensureAuthenticated, idSelectDicaController.handle)
dicaRoutes.get('/select', ensureAuthenticated, selectDicaController.handle)
dicaRoutes.get('/:id', ensureAuthenticated, getDicaController.handle)
dicaRoutes.put('/:id', ensureAuthenticated, updateDicaController.handle)
dicaRoutes.delete('/:id', ensureAuthenticated, deleteDicaController.handle)
dicaRoutes.delete('/', ensureAuthenticated, multiDeleteDicaController.handle)

export { dicaRoutes }