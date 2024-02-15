import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCategoriaUseCase } from './update-categoria-use-case'

class UpdateCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateCategoriaUseCase = container.resolve(UpdateCategoriaUseCase)

    const result = await updateCategoriaUseCase.execute({
      id,
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

export { UpdateCategoriaController }

