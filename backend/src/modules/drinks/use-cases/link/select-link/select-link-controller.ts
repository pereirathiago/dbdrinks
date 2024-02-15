import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectLinkUseCase } from './select-link-use-case'

class SelectLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectLinkUseCase = container.resolve(SelectLinkUseCase)

    const link = await selectLinkUseCase.execute({
      filter: filter as string,
    })

    return response.json(link)
  }
}

export { SelectLinkController }
