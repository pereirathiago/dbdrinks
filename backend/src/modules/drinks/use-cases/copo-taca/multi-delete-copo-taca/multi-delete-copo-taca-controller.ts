import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCopoTacaUseCase } from './multi-delete-copo-taca-use-case'
import { ListCopoTacaUseCase } from '../list-copo-taca/list-copo-taca-use-case'

class MultiDeleteCopoTacaController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCopoTacaUseCase = container.resolve(MultiDeleteCopoTacaUseCase)
    await multiDeleteCopoTacaUseCase.execute(ids)


    // restore list with updated records

    const listCopoTacaUseCase = container.resolve(ListCopoTacaUseCase)
    const copoTaca = await listCopoTacaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(copoTaca)
  }
}

export { MultiDeleteCopoTacaController }
