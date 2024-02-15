import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDestiladoPrincipalUseCase } from './delete-destilado-principal-use-case'
import { ListDestiladoPrincipalUseCase } from '../list-destilado-principal/list-destilado-principal-use-case'

class DeleteDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDestiladoPrincipalUseCase = container.resolve(DeleteDestiladoPrincipalUseCase)
    await deleteDestiladoPrincipalUseCase.execute(id)


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

export { DeleteDestiladoPrincipalController }
