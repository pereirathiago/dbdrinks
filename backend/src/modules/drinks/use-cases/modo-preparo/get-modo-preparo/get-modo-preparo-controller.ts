import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetModoPreparoUseCase } from './get-modo-preparo-use-case'

class GetModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getModoPreparoUseCase = container.resolve(GetModoPreparoUseCase)
    const modoPreparo = await getModoPreparoUseCase.execute(id)

    return response.status(modoPreparo.statusCode).json(modoPreparo.data)
  }
}

export { GetModoPreparoController }
