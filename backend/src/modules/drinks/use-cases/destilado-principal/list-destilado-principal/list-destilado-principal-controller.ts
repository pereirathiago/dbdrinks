import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDestiladoPrincipalUseCase } from './list-destilado-principal-use-case'

class ListDestiladoPrincipalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listDestiladoPrincipalUseCase = container.resolve(ListDestiladoPrincipalUseCase)

    const destiladoPrincipal = await listDestiladoPrincipalUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(destiladoPrincipal)
  }
}

export { ListDestiladoPrincipalsController }
