import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriaUseCase } from '../list-categoria/list-categoria-use-case'
import { DeleteCategoriaUseCase } from './delete-categoria-use-case'

class DeleteCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCategoriaUseCase = container.resolve(DeleteCategoriaUseCase)
    await deleteCategoriaUseCase.execute(id)


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

export { DeleteCategoriaController }
