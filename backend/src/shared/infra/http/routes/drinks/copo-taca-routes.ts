import { CreateCopoTacaController } from "@modules/drinks/use-cases/copo-taca/create-copo-taca/create-copo-taca-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListCopoTacasController } from "@modules/drinks/use-cases/copo-taca/list-copo-taca/list-copo-taca-controller";
import { CountCopoTacaController } from "@modules/drinks/use-cases/copo-taca/count-copo-taca/count-copo-taca-controller";
import { SelectCopoTacaController } from "@modules/drinks/use-cases/copo-taca/select-copo-taca/select-copo-taca-controller";
import { IdSelectCopoTacaController } from "@modules/drinks/use-cases/copo-taca/id-select-copo-taca/id-select-copo-taca-controller";
import { GetCopoTacaController } from "@modules/drinks/use-cases/copo-taca/get-copo-taca/get-copo-taca-controller";
import { UpdateCopoTacaController } from "@modules/drinks/use-cases/copo-taca/update-copo-taca/update-copo-taca-controller";
import { DeleteCopoTacaController } from "@modules/drinks/use-cases/copo-taca/delete-copo-taca/delete-copo-taca-controller";
import { MultiDeleteCopoTacaController } from "@modules/drinks/use-cases/copo-taca/multi-delete-copo-taca/multi-delete-copo-taca-controller";

const copoTacaRoutes = Router()

const createCopoTacaController = new CreateCopoTacaController()
const listCopoTacaController = new ListCopoTacasController()
const countCopoTacaController = new CountCopoTacaController()
const selectCopoTacaController = new SelectCopoTacaController()
const idSelectCopoTacaController = new IdSelectCopoTacaController()
const getCopoTacaController = new GetCopoTacaController()
const updateCopoTacaController = new UpdateCopoTacaController()
const deleteCopoTacaController = new DeleteCopoTacaController()
const multiDeleteCopoTacaController = new MultiDeleteCopoTacaController()

copoTacaRoutes.post('/', ensureAuthenticated, createCopoTacaController.handle)
copoTacaRoutes.post('/list', ensureAuthenticated, listCopoTacaController.handle)
copoTacaRoutes.post('/count', ensureAuthenticated, countCopoTacaController.handle)
copoTacaRoutes.get('/select/:id', ensureAuthenticated, idSelectCopoTacaController.handle)
copoTacaRoutes.get('/select', ensureAuthenticated, selectCopoTacaController.handle)
copoTacaRoutes.get('/:id', ensureAuthenticated, getCopoTacaController.handle)
copoTacaRoutes.put('/:id', ensureAuthenticated, updateCopoTacaController.handle)
copoTacaRoutes.delete('/:id', ensureAuthenticated, deleteCopoTacaController.handle)
copoTacaRoutes.delete('/', ensureAuthenticated, multiDeleteCopoTacaController.handle)

export { copoTacaRoutes }