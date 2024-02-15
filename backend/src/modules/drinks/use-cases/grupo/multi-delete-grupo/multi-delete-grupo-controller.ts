import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteGrupoUseCase } from './multi-delete-grupo-use-case'
import { ListGrupoUseCase } from '../list-grupo/list-grupo-use-case'

class MultiDeleteGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteGrupoUseCase = container.resolve(MultiDeleteGrupoUseCase)
    await multiDeleteGrupoUseCase.execute(ids)


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

export { MultiDeleteGrupoController }
