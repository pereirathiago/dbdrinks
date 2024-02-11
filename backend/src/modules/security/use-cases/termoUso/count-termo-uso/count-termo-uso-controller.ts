import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountTermoUsoUseCase } from './count-termo-uso-use-case'

class CountTermoUsoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countTermoUsoUseCase = container.resolve(CountTermoUsoUseCase)

    const termoUsosCount = await countTermoUsoUseCase.execute({
      search: search as string
    })

    return response.status(termoUsosCount.statusCode).json(termoUsosCount)
  }
}

export { CountTermoUsoController }
