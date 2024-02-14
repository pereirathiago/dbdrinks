import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListTipoUseCase } from './list-tipo-use-case'

class ListTiposController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listTipoUseCase = container.resolve(ListTipoUseCase)

    const tipo = await listTipoUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(tipo)
  }
}

export { ListTiposController }
