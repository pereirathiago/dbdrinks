import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListLinkUseCase } from '../list-link/list-link-use-case'
import { DeleteLinkUseCase } from './delete-link-use-case'

class DeleteLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteLinkUseCase = container.resolve(DeleteLinkUseCase)
    await deleteLinkUseCase.execute(id)


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

export { DeleteLinkController }
