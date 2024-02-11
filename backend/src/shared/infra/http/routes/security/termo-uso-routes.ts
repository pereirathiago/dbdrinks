import { Router } from 'express'
import { ensureAuthenticated } from '../../middlewares/ensure-authenticated'
import { CreateTermoUsoController } from '@modules/security/use-cases/termoUso/create-termo-uso/create-termo-uso-controller'
import { ListTermoUsoController } from '@modules/security/use-cases/termoUso/list-termo-uso/list-termo-uso-controller'
import { CountTermoUsoController } from '@modules/security/use-cases/termoUso/count-termo-uso/count-termo-uso-controller'
import { GetTermoUsoController } from '@modules/security/use-cases/termoUso/get-termo-uso/get-termo-uso-controller'
import { GetEmailTermoUsoController } from '@modules/security/use-cases/termoUso/get-email-termo-uso/get-email-termo-uso-controller'

const termoUsoRoutes = Router()

const createTermoUsoController = new CreateTermoUsoController()
const listTermoUsoController = new ListTermoUsoController()
const countTermoUsoController = new CountTermoUsoController()
const getTermoUsoController = new GetTermoUsoController()
const getEmailTermoUsoController = new GetEmailTermoUsoController()

termoUsoRoutes.post('/', createTermoUsoController.handle)
termoUsoRoutes.post('/list', ensureAuthenticated, listTermoUsoController.handle)
termoUsoRoutes.post('/count', ensureAuthenticated, countTermoUsoController.handle)
termoUsoRoutes.get('/by-email', ensureAuthenticated, getEmailTermoUsoController.handle)
termoUsoRoutes.get('/:id', ensureAuthenticated, getTermoUsoController.handle)

export { termoUsoRoutes }
