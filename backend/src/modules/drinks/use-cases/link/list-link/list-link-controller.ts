import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListLinkUseCase } from './list-link-use-case'

class ListLinksController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listLinkUseCase = container.resolve(ListLinkUseCase)

    const link = await listLinkUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(link)
  }
}

export { ListLinksController }
