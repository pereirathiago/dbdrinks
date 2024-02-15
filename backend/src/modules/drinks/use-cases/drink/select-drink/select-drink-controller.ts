import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDrinkUseCase } from './select-drink-use-case'

class SelectDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDrinkUseCase = container.resolve(SelectDrinkUseCase)

    const drink = await selectDrinkUseCase.execute({
      filter: filter as string,
    })

    return response.json(drink)
  }
}

export { SelectDrinkController }
