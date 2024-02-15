import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCopoTacaUseCase } from './list-copo-taca-use-case'

class ListCopoTacasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCopoTacaUseCase = container.resolve(ListCopoTacaUseCase)

    const copoTaca = await listCopoTacaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(copoTaca)
  }
}

export { ListCopoTacasController }
