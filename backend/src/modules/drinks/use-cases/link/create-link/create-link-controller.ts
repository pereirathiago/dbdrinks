import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateLinkUseCase } from "./create-link-use-case"

class CreateLinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      drinkId,
      link,
     } = request.body

    const createLinkUseCase = container.resolve(CreateLinkUseCase)

    const result = await createLinkUseCase.execute({
      drinkId,
      link
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

export { CreateLinkController }