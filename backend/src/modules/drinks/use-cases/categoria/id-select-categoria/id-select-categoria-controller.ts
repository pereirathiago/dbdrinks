import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCategoriaUseCase } from './id-select-categoria-use-case'

class IdSelectCategoriaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCategoriaUseCase = container.resolve(IdSelectCategoriaUseCase)

    const categoria = await idSelectCategoriaUseCase.execute({
      id: id as string
    })

    return response.json(categoria.data)
  }
}

export { IdSelectCategoriaController }
