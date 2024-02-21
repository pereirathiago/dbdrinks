import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateModoPreparoUseCase } from './update-modo-preparo-use-case'

class UpdateModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      drinkId,
      descricao,
      passo,
    } = request.body

    const { id } = request.params

    const updateModoPreparoUseCase = container.resolve(UpdateModoPreparoUseCase)

    const result = await updateModoPreparoUseCase.execute({
      id,
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

export { UpdateModoPreparoController }

