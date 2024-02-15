import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListDrinkUseCase } from '../list-drink/list-drink-use-case'
import { DeleteDrinkUseCase } from './delete-drink-use-case'

class DeleteDrinkController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDrinkUseCase = container.resolve(DeleteDrinkUseCase)
    await deleteDrinkUseCase.execute(id)


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

export { DeleteDrinkController }
