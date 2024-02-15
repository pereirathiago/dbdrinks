import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCopoTacaUseCase } from './update-copo-taca-use-case'

class UpdateCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateCopoTacaUseCase = container.resolve(UpdateCopoTacaUseCase)

    const result = await updateCopoTacaUseCase.execute({
      id,
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

export { UpdateCopoTacaController }

