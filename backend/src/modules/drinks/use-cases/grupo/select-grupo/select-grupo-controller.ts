import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectGrupoUseCase } from './select-grupo-use-case'

class SelectGrupoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectGrupoUseCase = container.resolve(SelectGrupoUseCase)

    const grupo = await selectGrupoUseCase.execute({
      filter: filter as string,
    })

    return response.json(grupo)
  }
}

export { SelectGrupoController }
