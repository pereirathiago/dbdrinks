import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectTipoUseCase } from './id-select-tipo-use-case'

class IdSelectTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectTipoUseCase = container.resolve(IdSelectTipoUseCase)

    const tipo = await idSelectTipoUseCase.execute({
      id: id as string
    })

    return response.json(tipo.data)
  }
}

export { IdSelectTipoController }
