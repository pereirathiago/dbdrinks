import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountModoPreparoUseCase } from './count-modo-preparo-use-case'

class CountModoPreparoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countModoPreparoUseCase = container.resolve(CountModoPreparoUseCase)

    const categoriaCount = await countModoPreparoUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountModoPreparoController }
