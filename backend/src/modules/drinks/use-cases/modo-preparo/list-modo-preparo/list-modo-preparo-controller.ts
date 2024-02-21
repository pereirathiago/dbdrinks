import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListModoPreparoUseCase } from './list-modo-preparo-use-case'

class ListModoPreparosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listModoPreparoUseCase = container.resolve(ListModoPreparoUseCase)

    const modoPreparo = await listModoPreparoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(modoPreparo)
  }
}

export { ListModoPreparosController }
