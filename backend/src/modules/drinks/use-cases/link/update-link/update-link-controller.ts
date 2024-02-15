import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateLinkUseCase } from './update-link-use-case'

class UpdateLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      drinkId,
      link,
    } = request.body

    const { id } = request.params

    const updateLinkUseCase = container.resolve(UpdateLinkUseCase)

    const result = await updateLinkUseCase.execute({
      id,
      drinkId,
      link,
    })
      .then(linkResult => {
        return linkResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateLinkController }

