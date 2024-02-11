import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTermoUsoUseCase } from './list-termo-uso-use-case'

class ListTermoUsoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listTermoUsoUseCase = container.resolve(ListTermoUsoUseCase)

    const termosUso = await listTermoUsoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(termosUso)
  }
}

export { ListTermoUsoController }
