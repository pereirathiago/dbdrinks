import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDrinkUseCase } from './count-drink-use-case'

class CountDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDrinkUseCase = container.resolve(CountDrinkUseCase)

    const categoriaCount = await countDrinkUseCase.execute({
      search: search as string
    })

    return response.status(categoriaCount.statusCode).json(categoriaCount)
  }
}

export { CountDrinkController }
