import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetTipoUseCase } from './get-tipo-use-case'

class GetTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getTipoUseCase = container.resolve(GetTipoUseCase)
    const tipo = await getTipoUseCase.execute(id)

    return response.status(tipo.statusCode).json(tipo.data)
  }
}

export { GetTipoController }
