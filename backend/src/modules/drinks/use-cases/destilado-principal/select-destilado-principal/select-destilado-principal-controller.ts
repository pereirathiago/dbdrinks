import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDestiladoPrincipalUseCase } from './select-destilado-principal-use-case'

class SelectDestiladoPrincipalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectDestiladoPrincipalUseCase = container.resolve(SelectDestiladoPrincipalUseCase)

    const destiladoPrincipal = await selectDestiladoPrincipalUseCase.execute({
      filter: filter as string,
    })

    return response.json(destiladoPrincipal)
  }
}

export { SelectDestiladoPrincipalController }
