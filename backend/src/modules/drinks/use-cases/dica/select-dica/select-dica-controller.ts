import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDicaUseCase } from './select-dica-use-case'

class SelectDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDicaUseCase = container.resolve(SelectDicaUseCase)

    const dica = await selectDicaUseCase.execute({
      filter: filter as string,
    })

    return response.json(dica)
  }
}

export { SelectDicaController }
