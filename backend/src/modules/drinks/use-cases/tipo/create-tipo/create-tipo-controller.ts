import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateTipoUseCase } from "./create-tipo-use-case"

class CreateTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createTipoUseCase = container.resolve(CreateTipoUseCase)

    const result = await createTipoUseCase.execute({
      nome,
      descricao,
    })
    .then(tipoResult => {
      return tipoResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateTipoController }