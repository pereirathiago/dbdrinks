import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateTipoUseCase } from './update-tipo-use-case'

class UpdateTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateTipoUseCase = container.resolve(UpdateTipoUseCase)

    const result = await updateTipoUseCase.execute({
      id,
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

export { UpdateTipoController }

