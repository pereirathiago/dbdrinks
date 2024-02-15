import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateGrupoUseCase } from './update-grupo-use-case'

class UpdateGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      descricao
    } = request.body

    const { id } = request.params

    const updateGrupoUseCase = container.resolve(UpdateGrupoUseCase)

    const result = await updateGrupoUseCase.execute({
      id,
      nome,
      descricao,
    })
      .then(grupoResult => {
        return grupoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateGrupoController }

