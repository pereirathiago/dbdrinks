import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteLinkUseCase } from './multi-delete-link-use-case'
import { ListLinkUseCase } from '../list-link/list-link-use-case'

class MultiDeleteLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteLinkUseCase = container.resolve(MultiDeleteLinkUseCase)
    await multiDeleteLinkUseCase.execute(ids)


    // restore list with updated records

    const listLinkUseCase = container.resolve(ListLinkUseCase)
    const link = await listLinkUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(link)
  }
}

export { MultiDeleteLinkController }
