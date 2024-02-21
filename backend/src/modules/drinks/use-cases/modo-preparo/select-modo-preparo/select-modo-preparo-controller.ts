import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectModoPreparoUseCase } from './select-modo-preparo-use-case'

class SelectModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectModoPreparoUseCase = container.resolve(SelectModoPreparoUseCase)

    const modoPreparo = await selectModoPreparoUseCase.execute({
      filter: filter as string,
    })

    return response.json(modoPreparo)
  }
}

export { SelectModoPreparoController }
