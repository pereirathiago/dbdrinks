import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoUseCase } from '../list-tipo/list-tipo-use-case'
import { DeleteTipoUseCase } from './delete-tipo-use-case'

class DeleteTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteTipoUseCase = container.resolve(DeleteTipoUseCase)
    await deleteTipoUseCase.execute(id)


    // restore list with updated records

    const listTipoUseCase = container.resolve(ListTipoUseCase)
    const tipo = await listTipoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tipo)
  }
}

export { DeleteTipoController }
