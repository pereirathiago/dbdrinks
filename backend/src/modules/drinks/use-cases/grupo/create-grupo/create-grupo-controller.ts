import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateGrupoUseCase } from "./create-grupo-use-case"

class CreateGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createGrupoUseCase = container.resolve(CreateGrupoUseCase)

    const result = await createGrupoUseCase.execute({
      nome,
      descricao,
    })
    .then(grupoResult => {
      return grupoResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateGrupoController }