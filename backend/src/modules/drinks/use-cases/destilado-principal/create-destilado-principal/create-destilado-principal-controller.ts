import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateDestiladoPrincipalUseCase } from "./create-destilado-principal-use-case"

class CreateDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createDestiladoPrincipalUseCase = container.resolve(CreateDestiladoPrincipalUseCase)

    const result = await createDestiladoPrincipalUseCase.execute({
      nome,
      descricao,
    })
    .then(destiladoPrincipalResult => {
      return destiladoPrincipalResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateDestiladoPrincipalController }