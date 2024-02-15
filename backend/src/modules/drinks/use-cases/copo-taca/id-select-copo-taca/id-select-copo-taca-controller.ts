import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCopoTacaUseCase } from './id-select-copo-taca-use-case'

class IdSelectCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCopoTacaUseCase = container.resolve(IdSelectCopoTacaUseCase)

    const copoTaca = await idSelectCopoTacaUseCase.execute({
      id: id as string
    })

    return response.json(copoTaca.data)
  }
}

export { IdSelectCopoTacaController }
