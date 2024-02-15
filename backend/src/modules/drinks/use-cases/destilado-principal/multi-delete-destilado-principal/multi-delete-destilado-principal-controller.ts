import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDestiladoPrincipalUseCase } from './multi-delete-destilado-principal-use-case'
import { ListDestiladoPrincipalUseCase } from '../list-destilado-principal/list-destilado-principal-use-case'

class MultiDeleteDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDestiladoPrincipalUseCase = container.resolve(MultiDeleteDestiladoPrincipalUseCase)
    await multiDeleteDestiladoPrincipalUseCase.execute(ids)


    // restore list with updated records

    const listDestiladoPrincipalUseCase = container.resolve(ListDestiladoPrincipalUseCase)
    const destiladoPrincipal = await listDestiladoPrincipalUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(destiladoPrincipal)
  }
}

export { MultiDeleteDestiladoPrincipalController }
