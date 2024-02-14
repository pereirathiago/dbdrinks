import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteTipoUseCase } from './multi-delete-tipo-use-case'
import { ListTipoUseCase } from '../list-tipo/list-tipo-use-case'

class MultiDeleteTipoController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteTipoUseCase = container.resolve(MultiDeleteTipoUseCase)
    await multiDeleteTipoUseCase.execute(ids)


    // restore list with updated records

    const listTipoUseCase = container.resolve(ListTipoUseCase)
    const tipo = await listTipoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(tipo)
  }
}

export { MultiDeleteTipoController }
