import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteModoPreparoUseCase } from './multi-delete-modo-preparo-use-case'
import { ListModoPreparoUseCase } from '../list-modo-preparo/list-modo-preparo-use-case'

class MultiDeleteModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteModoPreparoUseCase = container.resolve(MultiDeleteModoPreparoUseCase)
    await multiDeleteModoPreparoUseCase.execute(ids)


    // restore list with updated records

    const listModoPreparoUseCase = container.resolve(ListModoPreparoUseCase)
    const modoPreparo = await listModoPreparoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(modoPreparo)
  }
}

export { MultiDeleteModoPreparoController }
