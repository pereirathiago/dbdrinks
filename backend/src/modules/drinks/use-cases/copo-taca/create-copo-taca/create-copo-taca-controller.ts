import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCopoTacaUseCase } from "./create-copo-taca-use-case"

class CreateCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createCopoTacaUseCase = container.resolve(CreateCopoTacaUseCase)

    const result = await createCopoTacaUseCase.execute({
      nome,
      descricao,
    })
    .then(copoTacaResult => {
      return copoTacaResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCopoTacaController }