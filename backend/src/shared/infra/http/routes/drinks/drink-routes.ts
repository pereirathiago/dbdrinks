import { CreateDrinkController } from "@modules/drinks/use-cases/drink/create-drink/create-drink-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListDrinksController } from "@modules/drinks/use-cases/drink/list-drink/list-drink-controller";
import { CountDrinkController } from "@modules/drinks/use-cases/drink/count-drink/count-drink-controller";
import { SelectDrinkController } from "@modules/drinks/use-cases/drink/select-drink/select-drink-controller";
import { IdSelectDrinkController } from "@modules/drinks/use-cases/drink/id-select-drink/id-select-drink-controller";
import { GetDrinkController } from "@modules/drinks/use-cases/drink/get-drink/get-drink-controller";
import { UpdateDrinkController } from "@modules/drinks/use-cases/drink/update-drink/update-drink-controller";
import { DeleteDrinkController } from "@modules/drinks/use-cases/drink/delete-drink/delete-drink-controller";
import { MultiDeleteDrinkController } from "@modules/drinks/use-cases/drink/multi-delete-drink/multi-delete-drink-controller";

const drinkRoutes = Router()

const createDrinkController = new CreateDrinkController()
const listDrinkController = new ListDrinksController()
const countDrinkController = new CountDrinkController()
const selectDrinkController = new SelectDrinkController()
const idSelectDrinkController = new IdSelectDrinkController()
const getDrinkController = new GetDrinkController()
const updateDrinkController = new UpdateDrinkController()
const deleteDrinkController = new DeleteDrinkController()
const multiDeleteDrinkController = new MultiDeleteDrinkController()

drinkRoutes.post('/', ensureAuthenticated, createDrinkController.handle)
drinkRoutes.post('/list', ensureAuthenticated, listDrinkController.handle)
drinkRoutes.post('/count', ensureAuthenticated, countDrinkController.handle)
drinkRoutes.get('/select/:id', ensureAuthenticated, idSelectDrinkController.handle)
drinkRoutes.get('/select', ensureAuthenticated, selectDrinkController.handle)
drinkRoutes.get('/:id', ensureAuthenticated, getDrinkController.handle)
drinkRoutes.put('/:id', ensureAuthenticated, updateDrinkController.handle)
drinkRoutes.delete('/:id', ensureAuthenticated, deleteDrinkController.handle)
drinkRoutes.delete('/', ensureAuthenticated, multiDeleteDrinkController.handle)

export { drinkRoutes }