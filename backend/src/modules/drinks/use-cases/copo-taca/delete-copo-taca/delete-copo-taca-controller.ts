import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCopoTacaUseCase } from './delete-copo-taca-use-case'
import { ListCopoTacaUseCase } from '../list-copo-taca/list-copo-taca-use-case'

class DeleteCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCopoTacaUseCase = container.resolve(DeleteCopoTacaUseCase)
    await deleteCopoTacaUseCase.execute(id)


    // restore list with updated records

    const listCopoTacaUseCase = container.resolve(ListCopoTacaUseCase)
    const copoTaca = await listCopoTacaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(copoTaca)
  }
}

export { DeleteCopoTacaController }
