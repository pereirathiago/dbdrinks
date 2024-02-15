import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCopoTacaUseCase } from './get-copo-taca-use-case'

class GetCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCopoTacaUseCase = container.resolve(GetCopoTacaUseCase)
    const copoTaca = await getCopoTacaUseCase.execute(id)

    return response.status(copoTaca.statusCode).json(copoTaca.data)
  }
}

export { GetCopoTacaController }
