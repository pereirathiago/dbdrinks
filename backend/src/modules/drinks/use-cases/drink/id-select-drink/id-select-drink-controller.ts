import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDrinkUseCase } from './id-select-drink-use-case'

class IdSelectDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDrinkUseCase = container.resolve(IdSelectDrinkUseCase)

    const drink = await idSelectDrinkUseCase.execute({
      id: id as string
    })

    return response.json(drink.data)
  }
}

export { IdSelectDrinkController }
