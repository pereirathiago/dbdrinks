import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDrinkUseCase } from './get-drink-use-case'

class GetDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDrinkUseCase = container.resolve(GetDrinkUseCase)
    const drink = await getDrinkUseCase.execute(id)

    return response.status(drink.statusCode).json(drink.data)
  }
}

export { GetDrinkController }
