import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateDestiladoPrincipalUseCase } from './update-destilado-principal-use-case'

class UpdateDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateDestiladoPrincipalUseCase = container.resolve(UpdateDestiladoPrincipalUseCase)

    const result = await updateDestiladoPrincipalUseCase.execute({
      id,
      nome,
      descricao,
    })
      .then(destiladoPrincipalResult => {
        return destiladoPrincipalResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateDestiladoPrincipalController }

