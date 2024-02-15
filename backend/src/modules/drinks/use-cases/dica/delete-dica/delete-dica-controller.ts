import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDicaUseCase } from '../list-dica/list-dica-use-case'
import { DeleteDicaUseCase } from './delete-dica-use-case'

class DeleteDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDicaUseCase = container.resolve(DeleteDicaUseCase)
    await deleteDicaUseCase.execute(id)


    // restore list with updated records

    const listDicaUseCase = container.resolve(ListDicaUseCase)
    const dica = await listDicaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(dica)
  }
}

export { DeleteDicaController }
