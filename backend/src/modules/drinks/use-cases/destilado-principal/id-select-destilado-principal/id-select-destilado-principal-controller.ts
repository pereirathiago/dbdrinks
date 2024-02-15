import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDestiladoPrincipalUseCase } from './id-select-destilado-principal-use-case'

class IdSelectDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDestiladoPrincipalUseCase = container.resolve(IdSelectDestiladoPrincipalUseCase)

    const destiladoPrincipal = await idSelectDestiladoPrincipalUseCase.execute({
      id: id as string
    })

    return response.json(destiladoPrincipal.data)
  }
}

export { IdSelectDestiladoPrincipalController }
