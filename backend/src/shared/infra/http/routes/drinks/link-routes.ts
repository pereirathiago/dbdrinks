import { CreateLinkController } from "@modules/drinks/use-cases/link/create-link/create-link-controller";
import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensure-authenticated";
import { ListLinksController } from "@modules/drinks/use-cases/link/list-link/list-link-controller";
import { CountLinkController } from "@modules/drinks/use-cases/link/count-link/count-link-controller";
import { SelectLinkController } from "@modules/drinks/use-cases/link/select-link/select-link-controller";
import { IdSelectLinkController } from "@modules/drinks/use-cases/link/id-select-link/id-select-link-controller";
import { GetLinkController } from "@modules/drinks/use-cases/link/get-link/get-link-controller";
import { UpdateLinkController } from "@modules/drinks/use-cases/link/update-link/update-link-controller";
import { DeleteLinkController } from "@modules/drinks/use-cases/link/delete-link/delete-link-controller";
import { MultiDeleteLinkController } from "@modules/drinks/use-cases/link/multi-delete-link/multi-delete-link-controller";

const linkRoutes = Router()

const createLinkController = new CreateLinkController()
const listLinkController = new ListLinksController()
const countLinkController = new CountLinkController()
const selectLinkController = new SelectLinkController()
const idSelectLinkController = new IdSelectLinkController()
const getLinkController = new GetLinkController()
const updateLinkController = new UpdateLinkController()
const deleteLinkController = new DeleteLinkController()
const multiDeleteLinkController = new MultiDeleteLinkController()

linkRoutes.post('/', ensureAuthenticated, createLinkController.handle)
linkRoutes.post('/list', ensureAuthenticated, listLinkController.handle)
linkRoutes.post('/count', ensureAuthenticated, countLinkController.handle)
linkRoutes.get('/select/:id', ensureAuthenticated, idSelectLinkController.handle)
linkRoutes.get('/select', ensureAuthenticated, selectLinkController.handle)
linkRoutes.get('/:id', ensureAuthenticated, getLinkController.handle)
linkRoutes.put('/:id', ensureAuthenticated, updateLinkController.handle)
linkRoutes.delete('/:id', ensureAuthenticated, deleteLinkController.handle)
linkRoutes.delete('/', ensureAuthenticated, multiDeleteLinkController.handle)

export { linkRoutes }