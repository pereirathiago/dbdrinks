import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectLinkUseCase } from './id-select-link-use-case'

class IdSelectLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectLinkUseCase = container.resolve(IdSelectLinkUseCase)

    const link = await idSelectLinkUseCase.execute({
      id: id as string
    })

    return response.json(link.data)
  }
}

export { IdSelectLinkController }
