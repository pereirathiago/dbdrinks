import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCopoTacaUseCase } from './count-copo-taca-use-case'

class CountCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCopoTacaUseCase = container.resolve(CountCopoTacaUseCase)

    const copoTacaCount = await countCopoTacaUseCase.execute({
      search: search as string
    })

    return response.status(copoTacaCount.statusCode).json(copoTacaCount)
  }
}

export { CountCopoTacaController }
