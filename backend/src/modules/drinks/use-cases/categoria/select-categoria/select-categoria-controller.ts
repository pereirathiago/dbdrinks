import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCategoriaUseCase } from './select-categoria-use-case'

class SelectCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCategoriaUseCase = container.resolve(SelectCategoriaUseCase)

    const categoria = await selectCategoriaUseCase.execute({
      filter: filter as string,
    })

    return response.json(categoria)
  }
}

export { SelectCategoriaController }
