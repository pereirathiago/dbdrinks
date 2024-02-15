import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetLinkUseCase } from './get-link-use-case'

class GetLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getLinkUseCase = container.resolve(GetLinkUseCase)
    const link = await getLinkUseCase.execute(id)

    return response.status(link.statusCode).json(link.data)
  }
}

export { GetLinkController }
