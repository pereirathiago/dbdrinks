import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectModoPreparoUseCase } from './id-select-modo-preparo-use-case'

class IdSelectModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectModoPreparoUseCase = container.resolve(IdSelectModoPreparoUseCase)

    const modoPreparo = await idSelectModoPreparoUseCase.execute({
      id: id as string
    })

    return response.json(modoPreparo.data)
  }
}

export { IdSelectModoPreparoController }
