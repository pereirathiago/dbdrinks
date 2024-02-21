import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListModoPreparoUseCase } from '../list-modo-preparo/list-modo-preparo-use-case'
import { DeleteModoPreparoUseCase } from './delete-modo-preparo-use-case'

class DeleteModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteModoPreparoUseCase = container.resolve(DeleteModoPreparoUseCase)
    await deleteModoPreparoUseCase.execute(id)


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

export { DeleteModoPreparoController }
