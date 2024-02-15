import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateDicaUseCase } from "./create-dica-use-case"

class CreateDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      drinkId,
      dica,
     } = request.body

    const createDicaUseCase = container.resolve(CreateDicaUseCase)

    const result = await createDicaUseCase.execute({
      drinkId,
      dica
    })
    .then(dicaResult => {
      return dicaResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateDicaController }