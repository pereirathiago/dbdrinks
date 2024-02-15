import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDrinkUseCase } from './multi-delete-drink-use-case'
import { ListDrinkUseCase } from '../list-drink/list-drink-use-case'

class MultiDeleteDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDrinkUseCase = container.resolve(MultiDeleteDrinkUseCase)
    await multiDeleteDrinkUseCase.execute(ids)


    // restore list with updated records

    const listDrinkUseCase = container.resolve(ListDrinkUseCase)
    const drink = await listDrinkUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(drink)
  }
}

export { MultiDeleteDrinkController }
