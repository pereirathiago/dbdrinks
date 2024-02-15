import { CreateCategoriaController } from "@modules/drinks/use-cases/categoria/create-categoria/create-categoria-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListCategoriasController } from "@modules/drinks/use-cases/categoria/list-categoria/list-categoria-controller";
import { CountCategoriaController } from "@modules/drinks/use-cases/categoria/count-categoria/count-categoria-controller";
import { SelectCategoriaController } from "@modules/drinks/use-cases/categoria/select-categoria/select-categoria-controller";
import { IdSelectCategoriaController } from "@modules/drinks/use-cases/categoria/id-select-categoria/id-select-categoria-controller";
import { GetCategoriaController } from "@modules/drinks/use-cases/categoria/get-categoria/get-categoria-controller";
import { UpdateCategoriaController } from "@modules/drinks/use-cases/categoria/update-categoria/update-categoria-controller";
import { DeleteCategoriaController } from "@modules/drinks/use-cases/categoria/delete-categoria/delete-categoria-controller";
import { MultiDeleteCategoriaController } from "@modules/drinks/use-cases/categoria/multi-delete-categoria/multi-delete-categoria-controller";

const categoriaRoutes = Router()

const createCategoriaController = new CreateCategoriaController()
const listCategoriaController = new ListCategoriasController()
const countCategoriaController = new CountCategoriaController()
const selectCategoriaController = new SelectCategoriaController()
const idSelectCategoriaController = new IdSelectCategoriaController()
const getCategoriaController = new GetCategoriaController()
const updateCategoriaController = new UpdateCategoriaController()
const deleteCategoriaController = new DeleteCategoriaController()
const multiDeleteCategoriaController = new MultiDeleteCategoriaController()

categoriaRoutes.post('/', ensureAuthenticated, createCategoriaController.handle)
categoriaRoutes.post('/list', ensureAuthenticated, listCategoriaController.handle)
categoriaRoutes.post('/count', ensureAuthenticated, countCategoriaController.handle)
categoriaRoutes.get('/select/:id', ensureAuthenticated, idSelectCategoriaController.handle)
categoriaRoutes.get('/select', ensureAuthenticated, selectCategoriaController.handle)
categoriaRoutes.get('/:id', ensureAuthenticated, getCategoriaController.handle)
categoriaRoutes.put('/:id', ensureAuthenticated, updateCategoriaController.handle)
categoriaRoutes.delete('/:id', ensureAuthenticated, deleteCategoriaController.handle)
categoriaRoutes.delete('/', ensureAuthenticated, multiDeleteCategoriaController.handle)

export { categoriaRoutes }