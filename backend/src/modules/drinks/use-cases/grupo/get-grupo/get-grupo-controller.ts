import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetGrupoUseCase } from './get-grupo-use-case'

class GetGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getGrupoUseCase = container.resolve(GetGrupoUseCase)
    const grupo = await getGrupoUseCase.execute(id)

    return response.status(grupo.statusCode).json(grupo.data)
  }
}

export { GetGrupoController }
