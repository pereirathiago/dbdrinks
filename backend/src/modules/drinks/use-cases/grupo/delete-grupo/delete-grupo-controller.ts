import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListGrupoUseCase } from '../list-grupo/list-grupo-use-case'
import { DeleteGrupoUseCase } from './delete-grupo-use-case'

class DeleteGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteGrupoUseCase = container.resolve(DeleteGrupoUseCase)
    await deleteGrupoUseCase.execute(id)


    // restore list with updated records

    const listGrupoUseCase = container.resolve(ListGrupoUseCase)
    const grupo = await listGrupoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(grupo)
  }
}

export { DeleteGrupoController }
