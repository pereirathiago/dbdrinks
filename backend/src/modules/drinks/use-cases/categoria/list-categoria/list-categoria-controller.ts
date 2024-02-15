import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategoriaUseCase } from './list-categoria-use-case'

class ListCategoriasController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCategoriaUseCase = container.resolve(ListCategoriaUseCase)

    const categoria = await listCategoriaUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(categoria)
  }
}

export { ListCategoriasController }
