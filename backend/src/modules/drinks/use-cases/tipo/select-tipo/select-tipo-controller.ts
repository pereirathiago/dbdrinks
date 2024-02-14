import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectTipoUseCase } from './select-tipo-use-case'

class SelectTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectTipoUseCase = container.resolve(SelectTipoUseCase)

    const tipo = await selectTipoUseCase.execute({
      filter: filter as string,
    })

    return response.json(tipo)
  }
}

export { SelectTipoController }
