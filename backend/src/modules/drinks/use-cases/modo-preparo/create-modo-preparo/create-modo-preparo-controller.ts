import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateModoPreparoUseCase } from "./create-modo-preparo-use-case"

class CreateModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      drinkId,
      descricao,
      passo,
     } = request.body

    const createModoPreparoUseCase = container.resolve(CreateModoPreparoUseCase)

    const result = await createModoPreparoUseCase.execute({
      drinkId,
      descricao,
      passo
    })
    .then(modoPreparoResult => {
      return modoPreparoResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateModoPreparoController }