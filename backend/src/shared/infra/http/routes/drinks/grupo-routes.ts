import { CreateGrupoController } from "@modules/drinks/use-cases/grupo/create-grupo/create-grupo-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListGruposController } from "@modules/drinks/use-cases/grupo/list-grupo/list-grupo-controller";
import { CountGrupoController } from "@modules/drinks/use-cases/grupo/count-grupo/count-grupo-controller";
import { SelectGrupoController } from "@modules/drinks/use-cases/grupo/select-grupo/select-grupo-controller";
import { IdSelectGrupoController } from "@modules/drinks/use-cases/grupo/id-select-grupo/id-select-grupo-controller";
import { GetGrupoController } from "@modules/drinks/use-cases/grupo/get-grupo/get-grupo-controller";
import { UpdateGrupoController } from "@modules/drinks/use-cases/grupo/update-grupo/update-grupo-controller";
import { DeleteGrupoController } from "@modules/drinks/use-cases/grupo/delete-grupo/delete-grupo-controller";
import { MultiDeleteGrupoController } from "@modules/drinks/use-cases/grupo/multi-delete-grupo/multi-delete-grupo-controller";

const grupoRoutes = Router()

const createGrupoController = new CreateGrupoController()
const listGrupoController = new ListGruposController()
const countGrupoController = new CountGrupoController()
const selectGrupoController = new SelectGrupoController()
const idSelectGrupoController = new IdSelectGrupoController()
const getGrupoController = new GetGrupoController()
const updateGrupoController = new UpdateGrupoController()
const deleteGrupoController = new DeleteGrupoController()
const multiDeleteGrupoController = new MultiDeleteGrupoController()

grupoRoutes.post('/', ensureAuthenticated, createGrupoController.handle)
grupoRoutes.post('/list', ensureAuthenticated, listGrupoController.handle)
grupoRoutes.post('/count', ensureAuthenticated, countGrupoController.handle)
grupoRoutes.get('/select/:id', ensureAuthenticated, idSelectGrupoController.handle)
grupoRoutes.get('/select', ensureAuthenticated, selectGrupoController.handle)
grupoRoutes.get('/:id', ensureAuthenticated, getGrupoController.handle)
grupoRoutes.put('/:id', ensureAuthenticated, updateGrupoController.handle)
grupoRoutes.delete('/:id', ensureAuthenticated, deleteGrupoController.handle)
grupoRoutes.delete('/', ensureAuthenticated, multiDeleteGrupoController.handle)

export { grupoRoutes }