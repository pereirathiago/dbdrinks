import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDicaUseCase } from './multi-delete-dica-use-case'
import { ListDicaUseCase } from '../list-dica/list-dica-use-case'

class MultiDeleteDicaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDicaUseCase = container.resolve(MultiDeleteDicaUseCase)
    await multiDeleteDicaUseCase.execute(ids)


    // restore list with updated records

    const listDicaUseCase = container.resolve(ListDicaUseCase)
    const dica = await listDicaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(dica)
  }
}

export { MultiDeleteDicaController }
