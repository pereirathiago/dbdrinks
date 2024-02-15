import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDestiladoPrincipalUseCase } from './get-destilado-principal-use-case'

class GetDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDestiladoPrincipalUseCase = container.resolve(GetDestiladoPrincipalUseCase)
    const destiladoPrincipal = await getDestiladoPrincipalUseCase.execute(id)

    return response.status(destiladoPrincipal.statusCode).json(destiladoPrincipal.data)
  }
}

export { GetDestiladoPrincipalController }
