import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCategoriaUseCase } from "./create-categoria-use-case"

class CreateCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { nome, descricao } = request.body

    const createCategoriaUseCase = container.resolve(CreateCategoriaUseCase)

    const result = await createCategoriaUseCase.execute({
      nome,
      descricao,
    })
    .then(categoriaResult => {
      return categoriaResult
    })
    .catch(error => {
      return error
    })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCategoriaController }