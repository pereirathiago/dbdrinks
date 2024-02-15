import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDicaUseCase } from './list-dica-use-case'

class ListDicasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listDicaUseCase = container.resolve(ListDicaUseCase)

    const dica = await listDicaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(dica)
  }
}

export { ListDicasController }
