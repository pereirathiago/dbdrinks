import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateDrinkUseCase } from "./create-drink-use-case"

class CreateDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      nome, 
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
   } = request.body

    const createDrinkUseCase = container.resolve(CreateDrinkUseCase)

    const result = await createDrinkUseCase.execute({
      nome,
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
    })
    .then(drinkResult => {
      return drinkResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateDrinkController }