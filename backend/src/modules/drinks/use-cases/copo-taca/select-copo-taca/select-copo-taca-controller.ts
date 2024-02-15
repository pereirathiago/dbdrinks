import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCopoTacaUseCase } from './select-copo-taca-use-case'

class SelectCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCopoTacaUseCase = container.resolve(SelectCopoTacaUseCase)

    const copoTaca = await selectCopoTacaUseCase.execute({
      filter: filter as string,
    })

    return response.json(copoTaca)
  }
}

export { SelectCopoTacaController }
