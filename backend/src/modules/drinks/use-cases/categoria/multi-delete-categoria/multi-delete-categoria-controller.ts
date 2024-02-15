import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCategoriaUseCase } from './multi-delete-categoria-use-case'
import { ListCategoriaUseCase } from '../list-categoria/list-categoria-use-case'

class MultiDeleteCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCategoriaUseCase = container.resolve(MultiDeleteCategoriaUseCase)
    await multiDeleteCategoriaUseCase.execute(ids)


    // restore list with updated records

    const listCategoriaUseCase = container.resolve(ListCategoriaUseCase)
    const categoria = await listCategoriaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(categoria)
  }
}

export { MultiDeleteCategoriaController }
