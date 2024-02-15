import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListGrupoUseCase } from './list-grupo-use-case'

class ListGruposController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listGrupoUseCase = container.resolve(ListGrupoUseCase)

    const grupo = await listGrupoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(grupo)
  }
}

export { ListGruposController }
