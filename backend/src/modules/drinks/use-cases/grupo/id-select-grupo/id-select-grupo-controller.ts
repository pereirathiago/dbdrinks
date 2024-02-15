import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectGrupoUseCase } from './id-select-grupo-use-case'

class IdSelectGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectGrupoUseCase = container.resolve(IdSelectGrupoUseCase)

    const grupo = await idSelectGrupoUseCase.execute({
      id: id as string
    })

    return response.json(grupo.data)
  }
}

export { IdSelectGrupoController }
